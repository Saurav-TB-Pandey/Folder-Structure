import Joi from "joi";
import JoiObjectId from "joi-objectid";

/**
 * Schemas index module.
 *
 * @module schema
 * @author Saurav Pandey
 * @version 1.0.0
 */

// Extend Joi with ObjectId validation
Joi.ObjectId = JoiObjectId(Joi);

/**
 * Validation schema for name.
 *
 * @type {Joi.ObjectSchema}
 */
export const nameSchema = Joi.string()
  .label("Name")
  .trim()
  .min(2)
  .max(50)
  .pattern(/^[a-zA-Z\s]+$/)
  .required()
  .messages({
    "string.empty": "Name is required!",
    "any.required": "Name is required!",
    "string.base": "Name should be a string!",
    "string.min": "Minimum 2 characters.",
    "string.max": "Maximum 50 characters",
    "string.pattern.base": "Name should only contain letters and spaces",
  });

/**
 * Validation schema for first name.
 *
 * @type {Joi.StringSchema}
 */
export const firstNameSchema = Joi.string()
  .trim()
  .min(2)
  .max(30)
  .pattern(/^[^\d]+$/)
  .required()
  .label("First name")
  .messages({
    "string.empty": "First name cannot be empty",
    "string.min": "First name must be at least 2 characters",
    "string.max": "First name must be at most 30 characters",
    "string.pattern.base": "First name cannot contain numbers",
    "any.required": "First name is required",
  });

/**
 * Validation schema for last name.
 *
 * @type {Joi.StringSchema}
 */
export const lastNameSchema = Joi.string()
  .trim()
  .min(1)
  .max(30)
  .pattern(/^[^\d]+$/)
  .required()
  .label("Last name")
  .messages({
    "string.empty": "Last name cannot be empty",
    "string.min": "Last name must be at least 1 character",
    "string.max": "Last name must be at most 30 characters",
    "string.pattern.base": "Last name cannot contain numbers",
    "any.required": "Last name is required",
  });

/**
 * Validation schema for phone.
 *
 * @type {Joi.ObjectSchema}
 */
export const phoneSchema = Joi.string()
  .label("Phone number")
  .trim()
  .pattern(/^\d{7,15}$/)
  .messages({
    "string.pattern.base": "Invalid phone number",
    "any.required": "Phone number is required!",
    "string.empty": "Phone number is required!",
    "string.base": "Phone number should be a string!",
  })
  .required();

/**
 * Validation schema for username.
 *
 * @type {Joi.ObjectSchema}
 */
export const usernameSchema = Joi.string()
  .label("User name")
  .trim()
  .min(3)
  .max(20)
  .pattern(/^[a-zA-Z0-9_]+$/)
  .required()
  .messages({
    "string.empty": "User name is required!",
    "any.required": "User name is required!",
    "string.base": "User name should be a string!",
    "string.min": "Minimum 3 characters",
    "string.max": "Maximum 20 characters",
    "string.pattern.base":
      "User name should only contain letters, numbers, and underscores",
  });

/**
 * Validation schema for email.
 *
 * @type {Joi.ObjectSchema}
 */
export const emailSchema = Joi.string()
  .trim()
  .email({ tlds: { allow: false } })
  .required()
  .lowercase()
  .label("Email Address")
  .messages({
    "string.email": "Invalid Email Address!",
    "string.empty": "Email Address is required!",
    "any.required": "Email Address is required!",
  });

/**
 * Validation schema for password.
 *
 * @type {Joi.ObjectSchema}
 */
export const passwordSchema = Joi.string()
  .label("Password")
  .trim()
  .min(8)
  .max(50)
  .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/)
  .required()
  .messages({
    "string.empty": "Password is required!",
    "any.required": "Password is required!",
    "string.base": "Password should be a string!",
    "string.min": "Minimum 8 characters.",
    "string.max": "Maximum 50 characters",
    "string.pattern.base":
      "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
  });

/**
 * Validation schema for confirm password.
 *
 * @type {Joi.ObjectSchema}
 */
export const confirmPasswordSchema = Joi.string()
  .label("Confirm Password")
  .trim()
  .valid(Joi.ref("password"))
  .required()
  .messages({
    "string.empty": "Confirm Password is required!",
    "any.required": "Confirm Password is required!",
    "string.base": "Confirm Password should be a string!",
    "any.only": "Passwords do not match!",
  });

/**
 * Validation schema for comment.
 *
 * @type {Joi.ObjectSchema}
 */
export const commentSchema = Joi.string()
  .label("Comment")
  .allow("")
  .required()
  .messages({
    "string.base": "Comment must be a string",
    "any.required": "Comment is required",
  });

/**
 * Validation schema for customer details.
 *
 * @type {Joi.ObjectSchema}
 */
export const customerSchema = Joi.object({
  name: nameSchema,
  phone: phoneSchema,
});
