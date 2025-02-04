import { Router } from "express";
import authRouter from "./auth.routes.js";

/**
 * Routes index module.
 *
 * @module Routes
 * @author Saurav Pandey
 * @version 1.0.0
 */

const router = Router();

/**
 * Mounts the authentication routes under the "/auth" endpoint.
 */
router.use("/auth", authRouter);

export default router;
