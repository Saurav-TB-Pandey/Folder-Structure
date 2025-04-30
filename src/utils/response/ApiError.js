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
   * @param {string} data - The error message.
   */
  constructor(statusCode, message, data = null) {
    super(message);
    this.statusCode = statusCode;
    this.data = data;
    this.status = statusCode < 400 ? "Success" : "Failure";
  }
}

export default ApiError;
