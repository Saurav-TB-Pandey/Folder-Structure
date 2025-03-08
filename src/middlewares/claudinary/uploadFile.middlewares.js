import { v2 as cloudinary } from "cloudinary";
import { claudinaryConfig } from "../../config/index.js";
import { asyncHandler } from "../asyncHandler.middlewares.js";
import { ApiError } from "../../utils/response/index.js";
import logger from "../../utils/logger/index.js";
import { deleteFileSync } from "../../utils/common/index.js";

const { CLOUD_NAME, API_KEY, API_SECRET } = claudinaryConfig;

/**
 * Middleware for uploading files (images and videos) to Cloudinary with optimization.
 *
 * @module FileUpload
 * @author Saurav Pandey
 * @version 1.1.0
 *
 * @param {string} folder - The Cloudinary folder to upload the file to.
 * @param {Object} options - Additional upload options.
 * @param {string} options.resourceType - Resource type ('image', 'video', 'auto').
 * @returns {Function} Middleware function for file upload and optimization.
 * @throws {ApiError} Throws error if folder is not provided or file is missing.
 */
const uploadFile = (folder, options = { resourceType: "auto" }) => {
  // Validate folder parameter
  if (!folder) throw new ApiError(400, "Folder name is required!");

  // Configure Cloudinary with environment variables
  cloudinary.config({
    cloud_name: CLOUD_NAME,
    api_key: API_KEY,
    api_secret: API_SECRET,
  });

  // Return async middleware handler
  return asyncHandler(async (req, _, next) => {
    // Get file path from request
    const filePath = req?.file?.path;

    // Validate file existence
    if (!filePath) throw new ApiError(400, "File is required!");

    /**
     * Upload file to Cloudinary with specified folder and resource type
     *
     * @type {Object} uploadResult - Cloudinary upload response
     */
    const uploadResult = await cloudinary.uploader
      .upload(filePath, {
        folder, // Specify upload folder in Cloudinary
        resource_type: options.resourceType, // Specify resource type (auto, image, video)
      })
      .catch((error) => {
        // Handle upload errors
        deleteFileSync(filePath);
        throw new ApiError(400, `Error uploading the file: ${error.message}`);
      });

    // Log successful upload
    logger.info(`File uploaded to Cloudinary: ${uploadResult.url}`);

    // Create optimized URL based on resource type
    let optimizedUrl;

    if (uploadResult.resource_type === "image") {
      /**
       * Optimize image delivery using Cloudinary transformations
       *
       * @type {string} optimizedUrl - Optimized image URL
       */
      optimizedUrl = cloudinary.url(uploadResult.public_id, {
        transformation: [
          {
            // Auto format and quality for better performance
            fetch_format: "auto",
            quality: "auto",
          },
          {
            // Smart crop and fill transformation
            crop: "fill",
            gravity: "auto",
            //   width: 1200,
            //   height: 1200,
          },
        ],
      });
    } else {
      // For other resource types, use the original URL
      optimizedUrl = uploadResult.secure_url;
    }

    // Attach file information to the request
    req.fileUrl = optimizedUrl;
    req.fileData = {
      optimizedUrl,
      public_id: uploadResult.public_id,
      resource_type: uploadResult.resource_type,
      format: uploadResult.format,
      original_url: uploadResult.secure_url,
    };

    // Delete the file from local system after upload
    deleteFileSync(filePath);

    next();
  });
};

/**
 * Middleware for uploading video files to Cloudinary.
 *
 * @param {string} folder - The Cloudinary folder to upload the video to.
 * @returns {Function} Middleware function for video upload.
 */
export const uploadVideoToCloud = (folder) => {
  return uploadFile(folder, { resourceType: "video" });
};

/**
 * Middleware for uploading image files to Cloudinary.
 *
 * @param {string} folder - The Cloudinary folder to upload the image to.
 * @returns {Function} Middleware function for image upload.
 */
export const uploadImageToCloud = (folder) => {
  return uploadFile(folder, { resourceType: "image" });
};
