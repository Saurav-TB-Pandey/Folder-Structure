/**
 * Token verification middleware.
 *
 * @module VerifyToken
 * @author [Saurav Pandey]
 * @version 1.0.0
 */

import { ApiError } from "../../utils/response/index.js";
import { asyncHandler } from "../asyncHandler.middlewares.js";

/**
 * Middleware to verify the token availability in the request headers.
 *
 * @returns {Function} The middleware function.
 */
export const verifyToken = asyncHandler(async (req, res, next) => {
  /**
   * Extract the token from the authorization header.
   * Expected format: `Bearer <token>`
   */
  const token = req.headers["authorization"]?.split(" ")[1];

  /**
   * If the token is missing, throw an authentication error.
   */
  if (!token) {
    throw new ApiError(401, "Access token is required!");
  }

  /**
   * Attach the extracted token to the request object for further use.
   */
  req.accessToken = token;

  /**
   * Proceed to the next middleware or route handler.
   */
  next();
});
