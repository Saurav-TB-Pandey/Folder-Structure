import ApiError from "./ApiError.js";
import {
  sendErrorResponse,
  sendFileInResponse,
  throwValidationError,
} from "./errorResponse.js";
import sendSuccessResponse from "./successResponse.js";

/**
 * Response utilities module.
 *
 * @module ResponseUtils
 * @author Saurav Pandey
 * @version 1.0.0
 */

/**
 * Represents an API error.
 *
 * @typedef {Object} ApiError
 * @property {number} statusCode - The HTTP status code for the error.
 * @property {string} message - The error message.
 */
export { ApiError };

/**
 * Sends an error response to the client.
 *
 * @function sendErrorResponse
 * @param {Object} res - The response object.
 * @param {ApiError} error - The error object.
 */
export { sendErrorResponse };

/**
 * Sends an error file response to the client.
 *
 * @function sendFileInResponse
 * @param {Object} res - The response object.
 * @param {number} statusCode - The HTTP status code for the response.
 * @param {string} filePath - The path to the file to be sent.
 */
export { sendFileInResponse };

/**
 * Sends a success response to the client.
 *
 * @function sendSuccessResponse
 * @param {Object} res - The response object.
 * @param {number} [statusCode=200] - The HTTP status code for the response.
 * @param {string} [message="Successful!"] - The message to be included in the response.
 * @param {any} [data=null] - The data to be included in the response.
 */
export { sendSuccessResponse };

/**
 * Throws a validation error as an ApiError.
 *
 * @function throwValidationError
 * @param {Object} error - The validation error object.
 * @throws {ApiError} - The validation error as an ApiError.
 */
export { throwValidationError };
