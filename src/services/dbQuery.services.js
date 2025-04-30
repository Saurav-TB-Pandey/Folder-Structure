import { Model } from "sequelize";

/**
 * Database query utility module for MySQL/Sequelize.
 *
 * @module DBQueryUtils
 * @author Saurav Pandey
 * @version 1.0.0
 */

/**
 * Checks if data exists in the database based on the provided condition.
 *
 * @param {Object} params - Parameters for the query.
 * @param {Model} params.model - The Sequelize model to query.
 * @param {Object} [params.condition={}] - The query condition (where clause).
 * @returns {Promise<boolean>} - True if the data exists, false otherwise.
 */
export const count = async ({ model, condition = {} }) => {
  return model.count({
    where: condition,
  });
};

/**
 * Finds a single record based on the provided condition.
 *
 * @param {Object} params - Parameters for the query.
 * @param {Model} params.model - The Sequelize model to query.
 * @param {Object} [params.condition={}] - The query condition (where clause).
 * @param {Array<string>} [params.attributes=[]] - Specific attributes to retrieve.
 * @returns {Promise<Object|null>} - The found record or null.
 */
export const findOne = async ({ model, condition = {}, select = [] }) => {
  return model.findOne({
    where: condition,
    ...(select.length && { attributes: select }),
  });
};

/**
 * Finds multiple records based on the provided condition.
 *
 * @param {Object} params - Parameters for the query.
 * @param {Model} params.model - The Sequelize model to query.
 * @param {Object} [params.condition={}] - The query condition (where clause).
 * @param {Array<string>} [params.attributes=[]] - Specific attributes to retrieve.
 * @param {Object} [params.options={}] - Additional query options (limit, offset, order, etc.).
 * @returns {Promise<Array<Object>>} - Array of found records.
 */
export const findAll = async ({
  model,
  condition = {},
  select = [],
  options = {},
}) => {
  return model.findAll({
    where: condition,
    ...(select.length && { attributes: select }),
    ...options,
  });
};

/**
 * Creates a new record in the database.
 *
 * @param {Object} params - Parameters for the query.
 * @param {Model} params.model - The Sequelize model to query.
 * @param {Object} params.data - The data to create.
 * @returns {Promise<Object>} - The created record.
 */
export const createOne = async ({ model, data = {} }) => {
  return model.create(data);
};

/**
 * Updates an existing record in the database based on the provided condition.
 *
 * @param {Object} params - Parameters for the query.
 * @param {Model} params.model - The Sequelize model to query.
 * @param {Object} params.condition - The condition to find the record to update.
 * @param {Object} params.data - The data to update.
 * @returns {Promise<number>} - The number of affected rows.
 */
export const updateOne = async ({ model, condition = {}, data = {} }) => {
  return model.update(data, {
    where: condition,
  });
};

/**
 * Deletes a record from the database based on the provided condition.
 *
 * @param {Object} params - Parameters for the query.
 * @param {Model} params.model - The Sequelize model to query.
 * @param {Object} params.condition - The condition to find the record to delete.
 * @returns {Promise<number>} - The number of deleted rows.
 */
export const deleteOne = async ({ model, condition = {} }) => {
  return model.update(
    { deletedAt: new Date() },
    {
      where: condition,
    }
  );
};
