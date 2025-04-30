import dotenv from "dotenv";
import { server } from "./app.js";
import { config } from "./config/index.js";
import logger from "./utils/logger/index.js";
import connectDB from "./db/index.js";
import { syncModels } from "./db/operations/syncModels.js";

/**
 * Application entry point.
 *
 * @module Main
 * @version 1.0.0
 */

// Load environment variables from the .env file
dotenv.config({ path: "./.env" });

/**
 * Start the server.
 */

/**
 * Connects to the database and starts the server.
 */

connectDB()
  .then((connection) => {
    // Get the port from the configuration
    const PORT = config.PORT;

    if (connection?.authenticate) {
      // Sync All The Database Models
      (async () => await syncModels())();
      // Start the server and log the server's status
      server.listen(PORT, () => {
        logger.info(`Server is running on port ${PORT}`);
      });
    }
  })
  .catch((err) => {
    // Log any errors that occur during startup
    logger.error("Error starting the server:", err);
    process.exit(1);
  });
