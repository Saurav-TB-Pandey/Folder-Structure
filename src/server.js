import dotenv from "dotenv";
import connectDB from "./db/index.js";
import { server } from "./app.js";
import { config } from "./config/index.js";
import logger from "./utils/logger/index.js";

/**
 * Application entry point.
 *
 * @module Main
 * @author [Saurav Pandey]
 * @version 1.0.0
 */

// Load environment variables from the .env file
dotenv.config({ path: "./.env" });

/**
 * Connects to the database and starts the server.
 */
connectDB()
    .then(() => {
        // Get the port from the configuration
        const PORT = config.PORT;

        // Start the server and log the server's status
        server.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
            logger.info(`Server is running on port ${PORT}`);
        });
    })
    .catch((err) => {
        // Log any errors that occur during startup
        logger.error("Error starting the server:", err);
        process.exit(1);
    });
