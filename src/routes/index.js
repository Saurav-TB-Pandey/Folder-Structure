import { Router } from "express";
import authRouter from "./auth.routes.js";
import decryptPayload from "../middlewares/cryptography/decryptPayload.js";

/**
 * Routes index module.
 *
 * @module Routes
 * @author Saurav Pandey
 * @version 1.0.0
 */

const router = Router();

/**
 * Perform decryption on the req.body payloadfor all the routes.
 */
router.use(decryptPayload());

/**
 * Mounts the authentication routes under the "/auth" endpoint.
 */
router.use("/auth", authRouter);

export default router;
