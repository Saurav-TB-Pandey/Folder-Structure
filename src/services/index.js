import { isDataExists } from "./dbQuery.services.js";

/**
 * Services index module.
 *
 * @module Services
 * @author Saurav Pandey
 * @version 1.0.0
 */

/**
 * Exports the isDataExists function as isExists.
 *
 * @function isExists
 * @param {mongoose.Model} Model - The Mongoose model to query.
 * @param {Object} [condition={}] - The query condition.
 * @returns {Promise<boolean>} - True if the data exists, false otherwise.
 */
export { isDataExists as isExists };
