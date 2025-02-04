import mongoose from "mongoose";
import { config } from "../config/index.js";

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
                console.log("Database is already connected");
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
                console.log("Mongoose is attempting to connect...");
            });

            mongoose.connection.on("connected", () => {
                console.log(
                    `MongoDB connected successfully to ${connectionInstance.connection.host}`
                );
            });

            mongoose.connection.on("error", (err) => {
                console.error("MongoDB connection error:", err?.message);
                this.handleConnectionError(err);
            });

            mongoose.connection.on("disconnected", () => {
                console.log("MongoDB disconnected");
                this.handleDisconnection();
            });

            // Set up graceful shutdown handlers
            process.on("SIGINT", this.gracefulShutdown.bind(this));
            process.on("SIGTERM", this.gracefulShutdown.bind(this));

            return connectionInstance;
        } catch (error) {
            console.error("Failed to connect to MongoDB:", error?.message);
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
            console.log(
                `Retrying connection attempt ${this.retryAttempts} of ${
                    this.maxRetryAttempts
                } in ${this.retryInterval / 1000} seconds...`
            );
            await new Promise((resolve) =>
                setTimeout(resolve, this.retryInterval)
            );
            return this.connect();
        }

        console.error("Max retry attempts reached. Exiting process...");
        process.exit(1);
    }

    /**
     * Handles a MongoDB disconnection event.
     */
    handleDisconnection() {
        if (config.NODE_ENV === "production") {
            this.connect().catch((err) => {
                console.error("Failed to reconnect:", err);
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
            console.log(`Received ${signal}. Closing MongoDB connection...`);
            await mongoose.connection.close();
            console.log("MongoDB connection closed through app termination");
            process.exit(0);
        } catch (err) {
            console.error("Error during graceful shutdown:", err);
            process.exit(1);
        }
    }
}

// Create a singleton instance
const databaseService = new DatabaseService();

// Export the connect function
export const connectDB = () => databaseService.connect();
export default connectDB;
