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
 * Validation schema for first name.
 *
 * @type {Joi.ObjectSchema}
 */
export const firstNameSchema = Joi.string()
  .label("First name")
  .trim()
  .min(1)
  .max(30)
  .pattern(/^[a-zA-Z\s]+$/)
  .required()
  .messages({
    "string.empty": "First name is required!",
    "any.required": "First name is required!",
    "string.base": "First name should be a string!",
    "string.min": "Minimum 3 characters.",
    "string.max": "Maximum 30 characters",
    "string.pattern.base": "First name should only contain letters and spaces",
  });

/**
 * Validation schema for last name.
 *
 * @type {Joi.ObjectSchema}
 */
export const lastNameSchema = Joi.string()
  .label("Last name")
  .trim()
  .min(1)
  .max(30)
  .pattern(/^[a-zA-Z\s]+$/)
  .required()
  .messages({
    "string.empty": "Last name is required!",
    "any.required": "Last name is required!",
    "string.base": "Last name should be a string!",
    "string.min": "Minimum 3 characters.",
    "string.max": "Maximum 30 characters",
    "string.pattern.base": "Last name should only contain letters and spaces",
  });

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
 * Validation schemas.
 *
 * @type {Joi.ObjectSchema}
 */
export const signupSchema = Joi.object({
  firstName: firstNameSchema,
  lastName: lastNameSchema,
  userName: usernameSchema,
  email: emailSchema,
  password: passwordSchema,
  confirmPassword: confirmPasswordSchema,
});

export const loginSchema = Joi.object({
  email: emailSchema,
  password: passwordSchema,
});
