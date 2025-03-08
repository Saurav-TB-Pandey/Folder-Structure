import { Users } from "../models/index.js";
import { isExists } from "../services/index.js";
import { ApiError, sendSuccessResponse } from "../utils/response/index.js";

/**
 * Authentication controllers module.
 *
 * @module AuthControllers
 * @author Saurav Pandey
 * @version 1.0.0
 */

/**
 * Handles the user signup process.
 *
 * @function userSignup
 * @param {Object} req - The Express request object.
 * @param {Object} res - The Express response object.
 * @returns {Promise<void>}
 */
export const userSignup = async (req, res) => {
  const { firstName, lastName, userName, email, password } = req?.validatedData;

  const [isEmailExists, isUsernameExists] = await Promise.all([
    isExists(Users, { email }),
    isExists(Users, { userName }),
  ]);

  if (isEmailExists) {
    throw new ApiError(409, "Email already in use.");
  }

  if (isUsernameExists) {
    throw new ApiError(409, "Username already in use.");
  }

  const user = await new Users({
    email,
    userName,
    firstName,
    lastName,
    password,
  })?.save();

  if (!user) {
    throw new ApiError(500, "Error creating the profile.");
  }

  return sendSuccessResponse(res, 200, "Profile created.");
};

/**
 * Handles the user login process and generates the access token.
 *
 * @function userLogin
 * @param {Object} req - The Express request object.
 * @param {Object} res - The Express response object.
 * @returns {Promise<void>}
 */
export const userLogin = async (req, res) => {
  console.log(req.fileUrl, " ...........................", req.fileData);

  const { email, password } = req?.validatedData;

  const [isEmailExists, isUsernameExists] = await Promise.all([
    isExists(Users, { email }),
    isExists(Users, { userName }),
  ]);

  if (isEmailExists) {
    throw new ApiError(409, "Email already in use.");
  }

  if (isUsernameExists) {
    throw new ApiError(409, "Username already in use.");
  }

  const user = await new Users({
    email,
    userName,
    name,
    password,
  })?.save();

  if (!user) {
    throw new ApiError(500, "Error creating the profile.");
  }

  return sendSuccessResponse(res, 200, "Profile created.");
};
