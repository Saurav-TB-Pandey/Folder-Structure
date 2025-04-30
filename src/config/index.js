/**
 * Configuration module.
 *
 * @module Config
 * @author Saurav Pandey
 * @version 1.0.0
 */

/**
 * Application configuration.
 *
 * @type {Object}
 * @property {number} PORT - The port number for the server.
 * @property {string} X_TIME_API_KEY - The API key for the X-Time API.
 * @property {string} X_TIME_API_SCOPE - The scope for the X-Time API.
 * @property {string} X_TIME_CLIENT_ID - The client ID for the X-Time client instance.
 * @property {string} X_TIME_CLIENT_SECRET - The client secret for the X-Time client instance.
 * @property {string} X_TIME_SANDBOX_API_URL - The URL for the X-Time sandbox API.
 * @property {string} X_TIME_ACCESS_TOKEN_URL - The URL for the X-Time access token.
 * @property {string} X_TIME_SANDBOX_DEALER_CODE - The dealer code for the X-Time sandbox API.
 * @property {string} ENCRYPTION_KEY - The key for encrypting and decrypting data.
 * @property {string} SALT_WORK_FACTOR - The work factor for password salting.
 * @property {string} NODE_ENV - The current environment (development, production, etc.).
 */
export const config = {
  PORT: process.env.PORT,
  NODE_ENV: process.env.NODE_ENV,
  ENCRYPTION_KEY: process.env.ENCRYPTION_KEY,
  SALT_WORK_FACTOR: process.env.SALT_WORK_FACTOR,
  X_TIME_API_KEY: process.env.X_TIME_API_KEY,
  X_TIME_API_SCOPE: process.env.X_TIME_API_SCOPE,
  X_TIME_CLIENT_ID: process.env.X_TIME_CLIENT_ID,
  X_TIME_CLIENT_SECRET: process.env.X_TIME_CLIENT_SECRET,
  X_TIME_SANDBOX_API_URL: process.env.X_TIME_SANDBOX_API_URL,
  X_TIME_ACCESS_TOKEN_URL: process.env.X_TIME_ACCESS_TOKEN_URL,
  X_TIME_SANDBOX_DEALER_CODE: process.env.X_TIME_SANDBOX_DEALER_CODE,
};

/**
 * Email server configuration.
 *
 * @type {Object}
 * @property {string} HOST - The email server host.
 * @property {number} PORT - The email server port.
 * @property {string} EMAIL - The email address for sending emails.
 * @property {string} PASSWORD - The password for the email account.
 * @property {string} CIPHERS - The SSL/TLS ciphers to use.
 * @property {boolean} REJECT_UNAUTHORIZED - Whether to reject unauthorized SSL/TLS connections.
 */
export const emailConfig = {
  HOST: process.env.EMAIL_HOST,
  PORT: process.env.EMAIL_PORT,
  EMAIL: process.env.EMAIL,
  PASSWORD: process.env.EMAIL_PASSWORD,
  CIPHERS: process.env.EMAIL_CIPHERS,
  REJECT_UNAUTHORIZED: process.env.EMAIL_REJECT_UNAUTHORIZED,
};

/**
 * Database configuration.
 *
 * @type {Object}
 * @property {string} HOST - The host address for the database connection.
 * @property {number} PORT - The port number for the database connection.
 * @property {string} USER - The username for authenticating the database connection.
 * @property {string} PASSWORD - The password for authenticating the database connection.
 * @property {string} NAME - The name of the database to connect to.
 */
export const dbConfig = {
  HOST: process.env.DB_HOST,
  PORT: process.env.DB_PORT,
  USER: process.env.DB_USER,
  NAME: process.env.DB_NAME,
  PASSWORD: process.env.DB_PASSWORD,
  DIALECT: process.env.DB_DIALECT,
  LOGGING: false,
};
