/**
 * Cryptography utilities index module.
 *
 * @module CryptographyUtils
 * @author Saurav Pandey
 * @version 1.0.0
 */

import encryptData from "./encrypt";
import decryptData from "./decrypt";

/**
 * Export encryption and decryption utilities with simplified names.
 * - encrypt: Function to encrypt data
 * - decrypt: Function to decrypt data
 */
export { encryptData as encrypt, decryptData as decrypt };
