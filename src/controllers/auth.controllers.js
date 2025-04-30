import { sendSuccessResponse } from "../utils/response/index.js";
import axios from "axios";
import { config } from "../config/index.js";
const {
  X_TIME_API_SCOPE,
  X_TIME_CLIENT_ID,
  X_TIME_CLIENT_SECRET,
  X_TIME_ACCESS_TOKEN_URL,
} = config;

/**
 * Authentication controllers module.
 *
 * @module AuthControllers
 * @author Saurav Pandey
 * @version 1.0.0
 */

/**
 * Handles the access token generation from x-time
 *
 * @function generateAccessToken
 * @param {Object} req - The Express request object.
 * @param {Object} res - The Express response object.
 * @returns {Promise<void>}
 */
export const generateAccessToken = async (_, res) => {
  const response = await axios.post(X_TIME_ACCESS_TOKEN_URL, null, {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    auth: {
      username: X_TIME_CLIENT_ID,
      password: X_TIME_CLIENT_SECRET,
    },
    params: {
      grant_type: "client_credentials",
      scope: X_TIME_API_SCOPE,
    },
  });

  const token = response.data.access_token;

  return sendSuccessResponse(res, 200, "Access token generated.", { token });
};
