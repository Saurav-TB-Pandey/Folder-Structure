import CryptoJS from "crypto-js";
import { config } from "../../config/index.js";

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
    console.error(`${message}: ${error.message}`);
}

/**
 * Encrypts data using AES encryption.
 *
 * @param {Object|string} data - The data to be encrypted.
 * @returns {string|null} The encrypted data, or null if encryption fails.
 */
function encryptData(data) {
    try {
        const dataToEncrypt = JSON.stringify(data);
        const encryptionKey = config.ENCRYPTION_KEY;

        if (!encryptionKey) {
            throw new Error("Encryption key is not defined.");
        }

        const encryptedData = CryptoJS.AES.encrypt(
            dataToEncrypt,
            encryptionKey
        ).toString();
        return encryptedData;
    } catch (error) {
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
        const decryptionKey = config.ENCRYPTION_KEY;

        if (!decryptionKey) {
            throw new Error("Decryption key is not defined.");
        }

        const bytes = CryptoJS.AES.decrypt(data, decryptionKey);
        const decryptedOutput = bytes.toString(CryptoJS.enc.Utf8);

        try {
            return JSON.parse(decryptedOutput);
        } catch {
            return decryptedOutput;
        }
    } catch (error) {
        logError("Decryption failed", error);
        return null;
    }
}

export { encryptData, decryptData };
