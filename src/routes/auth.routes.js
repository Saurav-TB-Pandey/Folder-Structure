import { Router } from "express";
import { generateAccessToken } from "../controllers/index.js";
import { asyncHandler } from "../middlewares/asyncHandler.middlewares.js";

/**
 * Authentication routes module.
 *
 * @module AuthRoutes
 * @author Saurav Pandey
 * @version 1.0.0
 */

const router = Router();

/**
 * POST /auth/access-token - Create a new x-time api access token.
 *
 * @function generateAccessToken
 * @param {Object} req - The Express request object.
 * @param {Object} res - The Express response object.
 */
router.route("/access-token").get(asyncHandler(generateAccessToken));

export default router;
