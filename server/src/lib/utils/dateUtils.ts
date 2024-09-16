export const parseDateString = (
	dateString: string,
): Date | undefined => {
	const parsedDate = new Date(dateString);

	// Check if the parsed date is valid
	if (isNaN(parsedDate.getTime())) {
		return undefined; // Return null if the date is invalid
	}

	return parsedDate;
};
