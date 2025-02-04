import { Router } from "express";
import { userSignup } from "../controllers/index.js";
import { asyncHandler } from "../middlewares/asyncHandler.middlewares.js";
import validateData from "../validators/index.js";

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
    .post(asyncHandler(validateData("signup")), asyncHandler(userSignup));

// API To Login User.
// router.route("/").post(asyncHandler(userLogin));

export default router;
