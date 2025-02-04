import winston from "winston";
import "winston-daily-rotate-file";
import { config } from "../../config/index.js";

/**
 * Logger module for application-wide logging.
 *
 * @module Logger
 * @author [Saurav Pandey]
 * @version 1.0.0
 */

// Determine if the environment is production
const isProduction = config.NODE_ENV === "production";

/**
 * File rotation transport for logging.
 * Logs will be stored in the 'logs' directory with the filename format 'application-YYYY-MM-DD.log'.
 * Each log file has a maximum size of 20MB, and old logs are kept for 14 days.
 */
const fileRotateTransport = new winston.transports.DailyRotateFile({
    filename: "logs/application-%DATE%.log",
    datePattern: "YYYY-MM-DD",
    maxSize: "20m",
    maxFiles: "14d",
});

/**
 * Console transport for logging.
 * Logs are formatted with a timestamp, log level, and the log message.
 * This transport is only used in non-production environments.
 */
const consoleTransport = new winston.transports.Console({
    format: winston.format.combine(
        winston.format.colorize(),
        winston.format.printf(({ timestamp, level, message }) => {
            return `${timestamp} [${level}]: ${message}`;
        })
    ),
});

/**
 * Creates a Winston logger instance with the specified configurations.
 * In production, the logger is set to the 'info' level, while in non-production environments, it's set to 'debug'.
 * Logs are stored in the 'logs' directory, and exceptions and unhandled promise rejections are logged separately.
 */
const logger = winston.createLogger({
    level: isProduction ? "info" : "debug",
    format: winston.format.combine(
        winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
        winston.format.json()
    ),
    transports: [
        fileRotateTransport,
        ...(isProduction ? [] : [consoleTransport]),
    ],
    exceptionHandlers: [
        new winston.transports.File({ filename: "logs/exceptions.log" }),
    ],
    rejectionHandlers: [
        new winston.transports.File({ filename: "logs/rejections.log" }),
    ],
});

export default logger;
