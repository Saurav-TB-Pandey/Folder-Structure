import mongoose from "mongoose";
import { config } from "../config/index.js";
import logger from "../utils/logger/index.js";

/**
 * Database connection service.
 *
 * @module DatabaseService
 * @author Saurav Pandey
 * @version 1.0.0
 */
class DatabaseService {
  constructor() {
    this.retryAttempts = 0;
    this.maxRetryAttempts = 3;
    this.retryInterval = 5000; // 5 seconds
  }

  /**
   * Connects to the MongoDB database.
   *
   * @returns {Promise<mongoose.Connection>} The Mongoose connection instance.
   */
  async connect() {
    try {
      // Check if the database is already connected
      if (mongoose.connection.readyState === 1) {
        logger.info("Database is already connected");
        return;
      }

      // MongoDB connection options
      const options = {
        maxPoolSize: 10,
        serverSelectionTimeoutMS: 5000,
        socketTimeoutMS: 45000,
        family: 4, // Use IPv4
      };

      const connectionString = `${config.MONGODB_URI}/${config.DB_NAME}`;

      // Connect to MongoDB
      const connectionInstance = await mongoose.connect(
        connectionString,
        options
      );

      // Set up connection event handlers
      mongoose.connection.on("connecting", () => {
        logger.warn("Mongoose is attempting to connect...");
      });

      mongoose.connection.on("connected", () => {
        logger.info(
          `MongoDB connected successfully to ${connectionInstance.connection.host}`
        );
      });

      mongoose.connection.on("error", (err) => {
        logger.error("MongoDB connection error:", err);
        this.handleConnectionError(err);
      });

      mongoose.connection.on("disconnected", () => {
        logger.info("MongoDB disconnected");
        this.handleDisconnection();
      });

      // Set up graceful shutdown handlers
      process.on("SIGINT", this.gracefulShutdown.bind(this));
      process.on("SIGTERM", this.gracefulShutdown.bind(this));

      return connectionInstance;
    } catch (error) {
      logger.error("Failed to connect to MongoDB", error);
      return this.handleConnectionError(error);
    }
  }

  /**
   * Handles a MongoDB connection error.
   *
   * @param {Error} error - The connection error.
   * @returns {Promise<mongoose.Connection>} The Mongoose connection instance.
   */
  async handleConnectionError(error) {
    if (this.retryAttempts < this.maxRetryAttempts) {
      this.retryAttempts++;
      logger.warn(
        `Retrying connection attempt ${this.retryAttempts} of ${
          this.maxRetryAttempts
        } in ${this.retryInterval / 1000} seconds...`
      );
      await new Promise((resolve) => setTimeout(resolve, this.retryInterval));
      return this.connect();
    }

    logger.error("Max retry attempts reached. Exiting process...", error);
    process.exit(1);
  }

  /**
   * Handles a MongoDB disconnection event.
   */
  handleDisconnection() {
    if (config.NODE_ENV === "production") {
      this.connect().catch((err) => {
        logger.error("Failed to reconnect:", err);
      });
    }
  }

  /**
   * Gracefully shuts down the application by closing the MongoDB connection.
   *
   * @param {string} signal - The signal that triggered the shutdown.
   */
  async gracefulShutdown(signal) {
    try {
      logger.warn(`Received ${signal}. Closing MongoDB connection...`);
      await mongoose.connection.close();
      logger.info("MongoDB connection closed through app termination");
      process.exit(0);
    } catch (err) {
      logger.error("Error during graceful shutdown", err);
      process.exit(1);
    }
  }
}

// Create a singleton instance
const databaseService = new DatabaseService();

// Export the connect function
export const connectDB = () => databaseService.connect();
export default connectDB;
