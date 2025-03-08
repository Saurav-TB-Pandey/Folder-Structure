import { Router } from "express";
import { userSignup, userLogin } from "../controllers/index.js";
import { asyncHandler } from "../middlewares/asyncHandler.middlewares.js";
import validateData from "../validators/index.js";
import {
  uploadVideoToCloud,
  uploadImageToCloud,
} from "../middlewares/claudinary/uploadFile.middlewares.js";
import {
  handleImageSizeMulterError,
  uploadImage,
} from "../middlewares/multer/multer.middlewares.js";

/**
 * Authentication routes module.
 *
 * @module AuthRoutes
 * @author Saurav Pandey
 * @version 1.0.0
 */

const router = Router();

/**
 * POST /auth/signup - Create a new user profile.
 *
 * @function userSignup
 * @param {Object} req - The Express request object.
 * @param {Object} res - The Express response object.
 * @param {Function} next - The Express next middleware function.
 */
router
  .route("/signup")
  .post(validateData("userSignup"), asyncHandler(userSignup));

// /**
//  * POST /auth/login - Login the user to the platform.
//  *
//  * @function userLogin
//  * @param {Object} req - The Express request object.
//  * @param {Object} res - The Express response object.
//  * @param {Function} next - The Express next middleware function.
//  */
// router.route("/login").post(
//   uploadImage.single("test"),
//   handleImageSizeMulterError,
//   uploadImageToCloud("Test"),
//   //   uploadVideoToCloud("Test Video"),
//   validateData("userLogin"),
//   asyncHandler(userLogin)
// );

export default router;
