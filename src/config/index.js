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
 * @property {string} MONGODB_URI - The MongoDB connection URI.
 * @property {string} DB_NAME - The name of the MongoDB database.
 * @property {string} ACCESS_TOKEN_SECRET - The secret for generating access tokens.
 * @property {string} ACCESS_TOKEN_EXPIRY - The expiry time for access tokens.
 * @property {string} REFRESH_TOKEN_SECRET - The secret for generating refresh tokens.
 * @property {string} REFRESH_TOKEN_EXPIRY - The expiry time for refresh tokens.
 * @property {string} RESET_PASSWORD_TOKEN_SECRET - The secret for generating password reset tokens.
 * @property {string} RESET_PASSWORD_TOKEN_EXPIRY - The expiry time for password reset tokens.
 * @property {string} ENCRYPTION_KEY - The key for encrypting and decrypting data.
 * @property {string} SALT_WORK_FACTOR - The work factor for password salting.
 * @property {string} NODE_ENV - The current environment (development, production, etc.).
 */
export const config = {
    PORT: process.env.PORT,
    MONGODB_URI: process.env.MONGODB_URI,
    DB_NAME: process.env.DB_NAME,
    ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET,
    ACCESS_TOKEN_EXPIRY: process.env.ACCESS_TOKEN_EXPIRY,
    REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET,
    REFRESH_TOKEN_EXPIRY: process.env.REFRESH_TOKEN_EXPIRY,
    RESET_PASSWORD_TOKEN_SECRET: process.env.RESET_PASSWORD_TOKEN_SECRET,
    RESET_PASSWORD_TOKEN_EXPIRY: process.env.RESET_PASSWORD_TOKEN_EXPIRY,
    ENCRYPTION_KEY: process.env.ENCRYPTION_KEY,
    SALT_WORK_FACTOR: process.env.SALT_WORK_FACTOR,
    NODE_ENV: process.env.NODE_ENV,
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
