import { signupSchema } from "../schema/index.js";

/**
 * Schema names module.
 *
 * @module SchemaNames
 * @author Saurav Pandey
 * @version 1.0.0
 */

/**
 * Object containing all the schema definitions.
 *
 * @type {Object}
 * @property {Joi.ObjectSchema} signup - The signup schema.
 */
const schemas = {
    signup: signupSchema,
};

export default schemas;
