import { config } from "./config/index.js";

/**
 * Constants module.
 *
 * @module Constants
 * @author [Saurav Pandey]
 * @version 1.0.0
 */

/**
 * The name of the database.
 *
 * @type {string}
 */
export const DB_NAME = config.DB_NAME;

/**
 * CORS (Cross-Origin Resource Sharing) options.
 *
 * @type {Object}
 * @property {string} origin - Allows all origins to access the server.
 * @property {boolean} credentials - Allows credentials (cookies) to be sent.
 */
export const corsOptions = {
    origin: "*",
    credentials: true,
};

/**
 * Cookie options.
 *
 * @type {Object}
 * @property {boolean} httpOnly - Ensures the cookie is only accessible by the server.
 * @property {boolean} secure - Sets the cookie as secure (HTTPS) in production.
 * @property {string} sameSite - Enforces same-site policy to protect against CSRF attacks.
 * @property {number} maxAge - The maximum age of the cookie (2 days).
 */
export const cookieOptions = {
    httpOnly: true,
    secure: config.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 2 * 24 * 60 * 60 * 1000, // 2 days in milliseconds
};

/**
 * Rate-limiting options.
 *
 * @type {Object}
 * @property {number} max - The maximum number of requests per IP address within the time window.
 * @property {number} windowMs - The time window in milliseconds (15 minutes).
 * @property {string} message - The message to be displayed when the rate limit is exceeded.
 */
export const rateLimitOptions = {
    max: 1000,
    windowMs: 15 * 60 * 1000,
    message: "Too many requests, please try again later!",
};

/**
 * Static folders to be served by the application.
 *
 * @type {string[]}
 */
export const staticFolders = ["public"];
