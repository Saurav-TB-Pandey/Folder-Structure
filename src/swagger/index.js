import swaggerAutogen from "swagger-autogen";
import { config } from "../config/index.js";

/**
 * Swagger documentation generator.
 *
 * @module SwaggerGenerator
 * @author [Saurav Pandey]
 * @version 1.0.0
 */

/**
 * The Swagger documentation configuration.
 *
 * @type {Object}
 * @property {string} title - The title of the API documentation.
 * @property {string} description - The description of the API documentation.
 * @property {string} host - The host of the API, including the port and version.
 */
const doc = {
    info: {
        title: "Chat Book",
        description:
            "This Documentation Contains API Details Of The Chat Book App.",
    },
    host: `${config.HOST}:${config.PORT}/api/v1`,
};

/**
 * The output file path for the generated Swagger documentation.
 *
 * @type {string}
 */
const outputFile = "./swagger-output.json";

/**
 * The root file(s) where the API routes are defined.
 *
 * @type {string[]}
 */
const routes = ["../routes/index.js"];

/**
 * Generates the Swagger documentation based on the provided configuration.
 */
swaggerAutogen()(outputFile, routes, doc);
