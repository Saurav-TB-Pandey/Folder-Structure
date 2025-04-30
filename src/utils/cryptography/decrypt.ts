/**
 * Decryption utility module.
 *
 * @module DecryptionUtils
 * @author Saurav Pandey
 * @version 1.0.0
 */

import CryptoJS from "crypto-js";
import config from "../../config";

/**
 * Decrypts previously encrypted data.
 *
 * @param {string} data - The encrypted data string to decrypt.
 * @returns {any|string|null|unknown} - The decrypted data as an object (if valid JSON), string, or null if decryption fails.
 */
export default function decryptData(data: string) {
  try {
    // Get encryption key from config
    const { ENCRYPTION_KEY } = config;

    // URL decode and decrypt the data using AES decryption
    const decryptedOutput = CryptoJS.AES.decrypt(
      decodeURIComponent(data),
      ENCRYPTION_KEY
    ).toString(CryptoJS.enc.Utf8);

    try {
      // Attempt to parse the decrypted output as JSON
      return JSON.parse(decryptedOutput);
    } catch (error) {
      console.error("Parsing error:", error);
      // If parsing fails, return the decrypted output as a string
      return decryptedOutput;
    }
  } catch (error) {
    // Log the error and return null in case of failure
    console.error("Decryption failed:", error);
    return null;
  }
}
