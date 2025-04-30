/**
 * Common module for all common methods and functions
 *
 * @module Common
 * @author Saurav Pandey
 * @version 1.0.1
 */

/**
 * Concatenates first and last names into a full name.
 *
 * @function formatName
 * @param {string} firstName - The customer's first name.
 * @param {string} lastName - The customer's last name.
 * @returns {string} The formatted full name or an empty string if no name is provided.
 */
export const formatName = (firstName = "", lastName = "") => {
  if (!firstName && !lastName) return null;
  return [firstName, lastName].filter(Boolean).join(" ");
};

/**
 * Find and return the current date or the date after a given number of days.
 *
 * @function findDate
 * @param {number|null} days - The number of days to add to the current date. If null, returns the current date.
 * @returns {string} The current date or the date after the given number of days in "YYYY-MM-DD" format.
 */
export const findDate = (days = null) => {
  const today = new Date();
  const todayDate = today.toISOString().split("T")[0]; // Current date in "YYYY-MM-DD" format

  // If 'days' is not a number or is null, return the current date
  if (days === null || typeof days !== "number") {
    return todayDate;
  }

  const futureDate = new Date(today);
  futureDate.setDate(today.getDate() + days); // Add the given number of days to the current date
  const futureDateFormatted = futureDate.toISOString().split("T")[0]; // Future date in "YYYY-MM-DD" format

  return futureDateFormatted;
};
