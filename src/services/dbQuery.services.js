import { Model, Types } from "mongoose";

/**
 * Database query utility module.
 *
 * @module DBQueryUtils
 * @author Saurav Pandey
 * @version 1.0.0
 */

/**
 * Checks if data exists in the database based on the provided condition.
 *
 * @param {mongoose.Model} Model - The Mongoose model to query.
 * @param {Object} [condition={}] - The query condition.
 * @returns {Promise<boolean>} - True if the data exists, false otherwise.
 */
export const isDataExists = async (Model, condition = {}) => {
    return Model.exists(condition);
};
