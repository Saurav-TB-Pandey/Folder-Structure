import * as Yup from "yup";

export const name = Yup.string()
  .trim()
  .min(2, "Min 2 characters")
  .max(50, "Max 50 characters")
  .matches(/^[^\d]+$/, "Name cannot contain numbers")
  .required("Required");

export const firstName = Yup.string()
  .trim()
  .min(2, "Min 2 characters")
  .max(30, "Max 30 characters")
  .matches(/^[^\d]+$/, "Name cannot contain numbers")
  .required("First name is required!");

export const lastName = Yup.string()
  .trim()
  .min(1, "Min 1 characters")
  .max(30, "Max 30 characters")
  .matches(/^[^\d]+$/, "Name cannot contain numbers")
  .required("Last name is required!");

export const emailAddress = Yup.string()
  .trim()
  .email("Enter a valid email address")
  .max(100, "Email must be at most 100 characters")
  .required("Email is required!");

export const comment = Yup.string()
  .trim()
  .min(2, "Min 2 characters")
  .max(150, "Max 150 characters")
  .required("Comment is required!");
