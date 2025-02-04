/**
 * Async handler middleware.
 *
 * @module AsyncHandler
 * @author Saurav Pandey
 * @version 1.0.0
 */

/**
 * Wraps a controller function with an async handler.
 *
 * @param {Function} controller - The controller function to be executed.
 * @returns {Function} The wrapped async handler function.
 */
export const asyncHandler = (controller) => {
    /**
     * Executes the controller function in an asynchronous context and handles any errors.
     *
     * @param {Object} req - The Express request object.
     * @param {Object} res - The Express response object.
     * @param {Function} next - The Express next middleware function.
     */
    return async (req, res, next) => {
        try {
            // Execute the controller function
            await controller(req, res, next);
        } catch (error) {
            // Pass the error to the next middleware (usually an error handler)
            next(error);
        }
    };
};
