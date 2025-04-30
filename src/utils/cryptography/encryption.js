import CryptoJS from "crypto-js";
import { config } from "../../config/index.js";
import logger from "../logger/index.js";

/**
 * Cryptography utility module.
 *
 * @module CryptographyUtils
 * @author Saurav Pandey
 * @version 1.0.0
 */

/**
 * Logs an error message.
 *
 * @param {string} message - The error message.
 * @param {Error} error - The error object.
 */
function logError(message, error) {
  logger.error(`${message}: ${error}`);
}

/**
 * Encrypts data using AES encryption.
 *
 * @param {Object|string} data - The data to be encrypted.
 * @returns {string|null} The encrypted data, or null if encryption fails.
 */
function encryptData(data) {
  try {
    // Get encryption key from config
    const { ENCRYPTION_KEY } = config;

    // Convert data to JSON string
    const dataToEncrypt = JSON.stringify(data);

    // Encrypt the data using AES encryption
    const encryptedData = CryptoJS.AES.encrypt(
      dataToEncrypt,
      ENCRYPTION_KEY
    ).toString();

    // URL encode the encrypted data to ensure safe transmission
    return encodeURIComponent(encryptedData);
  } catch (error) {
    // Log the error and return null in case of failure
    logError("Encryption failed", error);
    return null;
  }
}

/**
 * Decrypts AES-encrypted data.
 *
 * @param {string} data - The encrypted data to be decrypted.
 * @returns {Object|string|null} The decrypted data, or null if decryption fails.
 */
function decryptData(data) {
  try {
    // Get encryption key from config
    const { ENCRYPTION_KEY } = config;

    // URL decode and decrypt the data using AES decryption
    const decryptedOutput = CryptoJS.AES.decrypt(
      decodeURIComponent(data),
      ENCRYPTION_KEY
    ).toString(CryptoJS.enc.Utf8);

    if (!decryptedOutput || decryptedOutput === "") {
      throw new Error("Key mismatch");
    }

    try {
      // Attempt to parse the decrypted output as JSON
      return JSON.parse(decryptedOutput);
    } catch (error) {
      logError("Parsing error", error);
      // If parsing fails, return the decrypted output as a string
      return decryptedOutput;
    }
  } catch (error) {
    if (["Key mismatch", "Malformed UTF-8 data"]?.includes(error.message)) {
      throw new Error("Decryption failed: Key mismatch");
    }
    throw error;
  }
}

export { encryptData, decryptData };
