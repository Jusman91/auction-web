/**
 * Utility function to parse a date string into a JavaScript Date object.
 * It ensures that the string is correctly formatted and converts it to a Date.
 * If the input is not a valid date string, it returns null.
 *
 * @param dateString - The date string to be parsed (e.g., "2024-10-08T12:34:56Z").
 * @returns {Date | null} - A JavaScript Date object or null if the input is invalid.
 */
export const parseDateString = (dateString: string): Date | null => {
  const parsedDate = new Date(dateString);

  // Check if the date is valid
  if (isNaN(parsedDate.getTime())) {
    console.error(`Invalid date string: ${dateString}`);
    return null;
  }

  return parsedDate;
};
