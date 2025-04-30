/**
 * Encryption utility module.
 *
 * @module EncryptionUtils
 * @author Saurav Pandey
 * @version 1.0.0
 */

import CryptoJS from "crypto-js";
import config from "../../config";

/**
 * Encrypts data using AES encryption.
 *
 * @param {unknown} data - The data to be encrypted.
 * @returns {string|null} - The encrypted data as a URL-encoded string, or null if encryption fails.
 */
export default function encryptData(data: unknown) {
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
    console.error("Encryption failed:", error);
    return null;
  }
}
