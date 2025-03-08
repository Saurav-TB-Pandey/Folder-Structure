import fs from "fs";
import logger from "../logger/index.js";

/**
 * Common module to contain all commonly used functions.
 *
 * @module Common
 * @author [Saurav Pandey]
 * @version 1.0.0
 */

/**
 * Synchronously deletes a file from the filesystem.
 *
 * @param {string} filePath - The path of the file to be deleted.
 * @returns {string} Success message when file is deleted.
 * @throws {Error} If the file cannot be deleted or does not exist.
 */
export const deleteFileSync = (filePath) => {
  try {
    fs.unlinkSync(filePath);
    logger.info(`File deleted: ${filePath}`);
    return "File deleted successfully!";
  } catch (err) {
    throw err;
  }
};
