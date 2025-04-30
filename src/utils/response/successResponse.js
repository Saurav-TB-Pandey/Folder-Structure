import { encryptData } from "../cryptography/encryption.js";
import { sendErrorResponse } from "./index.js";
import { config } from "../../config/index.js";
import { allowedEnvironments } from "../../constants.js";

/**
 * Sends a success response to the client.
 *
 * @param {Object} res - The response object.
 * @param {number} [statusCode=200] - The HTTP status code for the response.
 * @param {string} [message="Successful!"] - The message to be included in the response.
 * @param {any} [data=null] - The data to be included in the response.
 */
const sendSuccessResponse = (
  res,
  statusCode = 200,
  message = "Successful!",
  data = null
) => {
  try {
    // Construct the success response object
    const responseData = {
      status: "Success",
      message,
      ...(data
        ? {
            data: allowedEnvironments.includes(config.NODE_ENV)
              ? data
              : encryptData(data),
          }
        : {}),
    };

    // Send the success response with the appropriate status code
    res.status(statusCode).json(responseData);
  } catch (error) {
    // If an error occurs, send an error response
    sendErrorResponse(res, error);
  }
};

export default sendSuccessResponse;
