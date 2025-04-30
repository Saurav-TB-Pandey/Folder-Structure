import helmet from "helmet";
import cors from "cors";
import morgan from "morgan";
import express from "express";
import rateLimit from "express-rate-limit";
import mongoSanitize from "express-mongo-sanitize";
import xss from "xss-clean";
import { corsOptions, rateLimitOptions } from "../constants.js";
import logger from "../utils/logger/index.js";
import cookieParser from "cookie-parser";

/**
 * Security middleware module.
 *
 * @module SecurityMiddlewares
 * @author Saurav Pandey
 * @version 1.0.0
 */

/**
 * Sets security-related HTTP headers on responses.
 *
 * @returns {Function} The Helmet middleware function.
 */
export const helmetMiddleware = () => {
  return helmet({
    xssFilter: true,
    crossOriginResourcePolicy: { policy: "cross-origin" },
  });
};

/**
 * Enables Cross-Origin Resource Sharing with specified options.
 *
 * @returns {Function} The CORS middleware function.
 */
export const corsMiddleware = () => {
  return cors(corsOptions);
};

/**
 * Logs incoming HTTP requests using Morgan.
 *
 * @returns {Function} The Morgan middleware function.
 */
export const morganMiddleware = () => {
  return morgan("combined", {
    stream: {
      write: (message) => logger.info(message.trim()),
    },
  });
};

/**
 * Logs detailed information about requests and responses.
 *
 * @returns {Function} The logging middleware function.
 */
export const loggingMiddleware = () => {
  return (req, res, next) => {
    const start = Date.now();
    res.on("finish", () => {
      const duration = Date.now() - start;
      const logMessage = `${req.method} ${req.originalUrl} ${res.statusCode} - ${duration} ms`;
      logger.info(logMessage);
    });
    next();
  };
};

/**
 * Parses incoming JSON requests with a body size limit.
 *
 * @returns {Function} The JSON middleware function.
 */
export const jsonMiddleware = () => {
  return express.json({ limit: "200kb" });
};

/**
 * Middleware to parse cookies in incoming requests.
 *
 * @returns {Function} The cookie parser middleware function.
 */
export const cookieParserMiddleware = () => {
  return cookieParser();
};

/**
 * Parses incoming URL-encoded requests with a specified limit.
 *
 * @returns {Function} The URL-encoded middleware function.
 */
export const urlencodedMiddleware = () => {
  return express.urlencoded({ limit: "200kb", extended: false });
};

/**
 * Limits repeated requests to public APIs to prevent abuse.
 *
 * @returns {Function} The rate-limiting middleware function.
 */
export const rateLimitMiddleware = () => {
  return rateLimit(rateLimitOptions);
};

/**
 * Sanitizes user inputs to prevent NoSQL injections.
 *
 * @returns {Function} The MongoDB sanitization middleware function.
 */
export const mongoSanitizeMiddleware = () => {
  return mongoSanitize();
};

/**
 * Cleans user inputs to prevent cross-site scripting (XSS) attacks.
 *
 * @returns {Function} The XSS-cleaning middleware function.
 */
export const xssMiddleware = () => {
  return xss();
};

// Export all middleware functions as an array
export default [
  helmetMiddleware,
  corsMiddleware,
  morganMiddleware,
  loggingMiddleware,
  cookieParserMiddleware,
  jsonMiddleware,
  urlencodedMiddleware,
  rateLimitMiddleware,
  mongoSanitizeMiddleware,
  xssMiddleware,
];
