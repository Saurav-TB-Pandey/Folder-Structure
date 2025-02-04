import { config } from "../../config/index.js";
import { ApiError } from "./index.js";

/**
 * Error response utility module.
 *
 * @module ErrorResponseUtils
 * @author Saurav Pandey
 * @version 1.0.0
 */

/**
 * Sends an error response to the client.
 *
 * @param {Object} res - The response object.
 * @param {Object} error - The error object.
 */
const sendErrorResponse = (res, error) => {
    // Determine the environment (production or not)
    const isProduction = config.NODE_ENV === "production";

    // Get the status code from the error object, or default to 500 (Internal Server Error)
    const statusCode = error?.statusCode || 500;

    // Get the error message from the error object, or use a default message
    const message = error?.message || "Oops, something went wrong!";

    // Determine the status based on the status code
    const status = statusCode < 400 ? "Success" : "Failure";

    // Construct the error response object
    const errorResponse = {
        status,
        message,
        // Include the error stack trace only in non-production environments
        ...(isProduction ? {} : { errorStack: error?.stack }),
    };

    // Send the error response with the appropriate status code
    res.status(statusCode).json(errorResponse);
};

/**
 * Sends an error file response to the client.
 *
 * @param {Object} res - The response object.
 * @param {number} statusCode - The HTTP status code for the response.
 * @param {string} filePath - The path to the file to be sent.
 */
const sendFileInResponse = (res, statusCode, filePath) => {
    try {
        // Send the file with the appropriate status code
        res.status(statusCode).sendFile(filePath);
    } catch (error) {
        // If an error occurs, send an error response
        sendErrorResponse(res, error);
    }
};

/**
 * Throws a validation error as an ApiError.
 *
 * @param {Object} error - The validation error object.
 * @throws {ApiError} - The validation error as an ApiError.
 */
const throwValidationError = (error) => {
    throw new ApiError(400, error?.details[0].message.replace(/["',`]/g, ""));
};

export { sendErrorResponse, sendFileInResponse, throwValidationError };
