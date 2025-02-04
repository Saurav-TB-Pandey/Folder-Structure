/**
 * Custom API error class.
 *
 * @module ApiError
 * @author [Saurav Pandey]
 * @version 1.0.0
 */

/**
 * Represents an API error.
 *
 * @class ApiError
 * @extends {Error}
 */
class ApiError extends Error {
    /**
     * Creates an instance of ApiError.
     *
     * @param {number} statusCode - The HTTP status code for the error.
     * @param {string} message - The error message.
     */
    constructor(statusCode, message) {
        super(message);
        this.statusCode = statusCode;
        // this.status = statusCode < 400 ? "Success" : "Failure";
    }
}

export default ApiError;
