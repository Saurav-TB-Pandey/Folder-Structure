import multer from "multer";
import path from "path";
import { ApiError } from "../../utils/response/index.js";

/**
 * Multer file upload middleware for handling image uploads.
 *
 * @module ImageUploadMiddleware
 * @author Saurav Pandey
 * @version 1.0.0
 */

/**
 * Creates a disk storage configuration for multer.
 *
 * @param {string} destination - The directory path to save uploaded files.
 * @returns {multer.StorageEngine} Configured multer disk storage.
 */
const storage = (destination) =>
    multer.diskStorage({
        // Set the destination directory for file storage
        destination: (req, res, cb) => {
            cb(null, destination);
        },
        // Generate a unique filename for each uploaded file
        filename: (req, file, cb) => {
            // Combine timestamp with original filename to ensure uniqueness
            const fileName = `${Date.now()}${path.extname(file.originalname)}`;
            cb(null, fileName);
        },
    });

/**
 * Validates image file types during upload.
 *
 * @param {Object} _ - Express request object (unused).
 * @param {Object} file - Uploaded file object.
 * @param {Function} cb - Callback function.
 * @throws {ApiError} If file type is not allowed.
 */
const imageFileFilter = (req, file, cb) => {
    // Allowed image file extensions
    const allowedFileTypes = /\.(jpeg|jpg|png|mp4)$/i;

    // Check if file extension is valid
    const isValidExtension = allowedFileTypes.test(
        path.extname(file.originalname)
    );

    if (!isValidExtension) {
        // Throw custom API error for invalid file types
        return cb(
            new ApiError(
                400,
                "Only image files (JPEG, JPG, and PNG) are allowed!"
            ),
            false
        );
    }

    // Allow file upload if extension is valid
    return cb(null, true);
};

/**
 * Error handler for Multer file upload errors.
 *
 * @param {Error} err - Error object.
 * @param {Object} _ - Express request object (unused).
 * @param {Object} _ - Express response object (unused).
 * @param {Function} next - Express next middleware function.
 * @throws {ApiError} For specific file size limit errors.
 */
const handleImageSizeMulterError = (err, req, res, next) => {
    // Check if error is a Multer-specific file size error
    if (err instanceof multer.MulterError) {
        if (err.code === "LIMIT_FILE_SIZE") {
            throw new ApiError(400, "File size exceeds the 5 MB limit.");
        }
    }
    // Pass other errors to the next error handling middleware
    next(err);
};

/**
 * Multer upload configuration for image files.
 *
 * @type {multer.Multer}
 * @constant
 * @description Configures file storage, filtering, and size limits for image uploads
 */
const uploadImage = multer({
    storage: storage("public/images"),
    fileFilter: imageFileFilter,
    limits: {
        fileSize: 5 * 1024 * 1024,
    },
});

// Export upload middleware and error handler
export { uploadImage, handleImageSizeMulterError };

/**
 * Multer Upload Method Examples
 *
 * @description Various ways to use multer for file uploads
 *
 * Method 1: Multiple files with field limits
 * upload.fields([
 *   { name: "avatar", maxCount: 1 },
 *   { name: "coverImage", maxCount: 1 }
 * ])
 *
 * Method 2: Single file upload
 * upload.single("avatar")
 *
 * Method 3: Multiple file upload with count limit
 * upload.array("avatar", 10)
 */
