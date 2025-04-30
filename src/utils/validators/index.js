import schemas from "./schemaNames/index.js";
import { throwValidationError, ApiError } from "../response/index.js";
import { asyncHandler } from "../../middlewares/asyncHandler.middlewares.js";

/**
 * Data validation middleware module.
 *
 * @module DataValidator
 * @author Saurav Pandey
 * @version 1.0.0
 */

/**
 * Validates the request data using the specified schema.
 *
 * @param {string} type - The type of schema to use for validation.
 * @returns {Function} The middleware function.
 */
const validateData = (type) => {
  return asyncHandler(async (req, _, next) => {
    const schema = schemas[type];

    if (!schema) {
      throw new ApiError(500, "Something is wrong.");
    }

    // Validate the data using the schema
    const { error, value } = schema?.validate(req.body);

    if (error) {
      // Throw a validation error if there are any issues
      throwValidationError(error);
    }

    // Attach the validated data to the request object
    req.payload = value;

    // Call the next middleware
    next();
  });
};

export default validateData;
