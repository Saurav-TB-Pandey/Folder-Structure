/**
 * @module decryptPayload
 * @description Middleware to decrypt the request payload from the request body.
 * @author Saurav Pandey
 * @version 1.0.0
 */

import { asyncHandler } from "../asyncHandler.middlewares.js";
import { decryptData } from "../../utils/cryptography/encryption.js";
import { config } from "../../config/index.js";
import { allowedEnvironments } from "../../constants.js";

/**
 * Decrypts the 'payload' field from the request body and replaces `req.body` with the decrypted data.
 *
 * @returns {Function} Express middleware function
 */
const decryptPayload = () =>
  asyncHandler((req, _, next) => {
    if (!allowedEnvironments.includes(config.NODE_ENV) && req.body?.payload) {
      req.body = decryptData(req.body.payload);
    } else if (allowedEnvironments.includes(config.NODE_ENV)) {
      req.body = req.body.payload;
    }
    next();
  });

export default decryptPayload;
