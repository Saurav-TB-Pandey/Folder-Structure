import { Sequelize } from "sequelize";
import { dbConfig } from "../config/index.js";
import logger from "../utils/logger/index.js";

/**
 * Creates a temporary connection to create the database if it doesn't exist
 *
 * @returns {Promise<void>}
 */
const createDatabaseIfNotExists = async () => {
  // Create a connection without specifying a database to connect to
  const tempConnection = new Sequelize({
    dialect: dbConfig.DIALECT,
    host: dbConfig.HOST,
    username: dbConfig.USER,
    password: dbConfig.PASSWORD,
    logging: false,
  });

  try {
    // Check if database exists
    const [results] = await tempConnection.query(
      `SELECT SCHEMA_NAME FROM INFORMATION_SCHEMA.SCHEMATA WHERE SCHEMA_NAME = '${dbConfig.NAME}'`
    );

    if (results?.length === 0) {
      // Database doesn't exist, create it
      await tempConnection.query(
        `CREATE DATABASE IF NOT EXISTS \`${dbConfig.NAME}\``
      );
      logger.info(`Database '${dbConfig.NAME}' created successfully`);
    } else {
      logger.info(`Database '${dbConfig.NAME}' already exists`);
    }
  } catch (error) {
    logger.error(`Error checking/creating database: ${error.message}`);
    throw error;
  } finally {
    // Close the temporary connection
    await tempConnection.close();
  }
};

/**
 * Creates and configures a new Sequelize connection instance
 *
 * @returns {Sequelize} Configured Sequelize instance
 */
const createConnection = () => {
  const connectionOptions = {
    dialect: dbConfig.DIALECT,
    host: dbConfig.HOST,
    logging: dbConfig.LOGGING,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  };

  return new Sequelize(
    dbConfig.NAME,
    dbConfig.USER,
    dbConfig.PASSWORD,
    connectionOptions
  );
};

// Configuration constants
const MAX_RETRY_ATTEMPTS = 5;
const RETRY_INTERVAL = 5000; // 5 seconds

let connection = createConnection() ?? null;
let retryAttempts = 0;
let isShuttingDown = false;

/**
 * Handles database connection errors and implements retry logic
 *
 * @param {Error} error - The connection error
 * @returns {Promise<Sequelize>} The Sequelize connection instance
 * @throws {Error} If max retry attempts are reached
 */
const handleConnectionError = async (error) => {
  if (retryAttempts < MAX_RETRY_ATTEMPTS) {
    retryAttempts++;
    const retryInSeconds = RETRY_INTERVAL / 1000;
    logger.warn(
      `Retrying database connection (${retryAttempts}/${MAX_RETRY_ATTEMPTS}) in ${retryInSeconds} seconds...`
    );

    await new Promise((resolve) => setTimeout(resolve, RETRY_INTERVAL));
    return connectDatabase();
  }

  throw new Error(
    `Failed to connect after ${MAX_RETRY_ATTEMPTS} attempts. Last error: ${error.message}`
  );
};

/**
 * Gracefully shuts down the database connection
 *
 * @param {string} signal - The signal that triggered the shutdown
 * @returns {Promise<void>}
 */
const gracefulShutdown = async (signal) => {
  if (isShuttingDown) return;
  isShuttingDown = true;

  try {
    logger.warn(`\nReceived ${signal}. Starting graceful shutdown...`);

    if (connection) {
      await connection.close();
      logger.info("Database connection closed successfully");
    }

    process.exit(0);
  } catch (error) {
    logger.error("Error during graceful shutdown:", error);
    process.exit(1);
  }
};

/**
 * Sets up process signal handlers for graceful shutdown
 */
const setupShutdownHandlers = () => {
  const signals = ["SIGINT", "SIGTERM", "SIGUSR2"];
  signals.forEach((signal) => {
    process.once(signal, async () => {
      await gracefulShutdown(signal);
    });
  });
};

/**
 * Connects to the MySQL database with retry mechanism
 *
 * @returns {Promise<Sequelize>} The Sequelize connection instance
 * @throws {Error} If connection fails after maximum retry attempts
 */
const connectDatabase = async () => {
  try {
    await createDatabaseIfNotExists();
    if (connection?.authenticate) {
      await connection.authenticate();
    } else {
      connection = createConnection();
      await connection.authenticate();
    }

    logger.info("Database connected successfully");
    setupShutdownHandlers();
    return connection;
  } catch (error) {
    logger.error("Database connection error:", error);
    return handleConnectionError(error);
  }
};

// Export the connection and connect function
export default connectDatabase;
export const sequelize = connection;
