import express from "express";
import https from "https";
import http from "http";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { serve, setup } from "swagger-ui-express";
import { staticFolders } from "./constants.js";
import { config } from "./config/index.js";
import indexRouter from "./routes/index.js";
import logger from "./utils/logger/index.js";
import middlewares from "./middlewares/security.middlewares.js";
import swaggerDocument from "./swagger/swagger-output.json" assert { type: "json" };
import {
  sendErrorResponse,
  sendFileInResponse,
} from "./utils/response/index.js";

/**
 * Main application entry point.
 *
 * @module App
 * @author [Saurav Pandey]
 * @version 1.0.0
 */

const app = express();
const isProduction = config.NODE_ENV === "production";

// Apply security middleware
middlewares?.forEach((middleware) => {
  app.use(middleware());
});

// Serve static folders
staticFolders.forEach((folder) => {
  app.use(express.static(folder));
});

// Mount the API router
app.use("/api/v1", indexRouter);

// Mount the Swagger UI
app.use("/api-docs", serve, setup(swaggerDocument));

// Global error handler
app.use((err, req, res, next) => {
  logger.error(`${req.method} ${req.originalUrl} - ${err.message}`);
  sendErrorResponse(res, err);
});

let server;

try {
  // Configure HTTPS options
  const httpsOptions = {
    key: config.SSL_KEY ? fs.readFileSync(config.SSL_KEY) : null,
    cert: config.SSL_CRT ? fs.readFileSync(config.SSL_CRT) : null,
  };

  // Create the HTTPS server if the SSL configuration is complete
  if (httpsOptions.key && httpsOptions.cert) {
    server = https.createServer(httpsOptions, app);
    logger.info("Running the HTTPS server");
  } else {
    throw new Error(
      "SSL configuration is missing or incomplete. Falling back to HTTP."
    );
  }
} catch (error) {
  logger.warn(error.message || "Running the HTTP server");
  server = http.createServer(app);
}

// Serve the React app in production
if (isProduction) {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);

  app.use(express.static(path.join(__dirname, "../../Frontend/build")));

  app.get("*", (_, res) => {
    res.sendFile(
      path.join(__dirname, "../../Frontend/build", "index.html"),
      (err) => {
        if (err) {
          sendFileInResponse(
            res,
            500,
            path.join(__dirname, "../public/HTML", "error.html")
          );
        }
      }
    );
  });
}

export { app, server };
