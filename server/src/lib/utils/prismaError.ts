import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { NextFunction } from 'express';
import { createError } from '../../middleware';

export const prismaError = (
	error: PrismaClientKnownRequestError,
	next: NextFunction,
) => {
	if (error.code === 'P2002') {
		const target = error.meta?.target as string;

		let message = 'A unique constraint failed.';

		// Map target to user-friendly message
		switch (true) {
			case target.includes('User_name_key'):
				message =
					'Username is already in use. Please choose a different one.';
				break;
			case target.includes('User_email_key'):
				message =
					'Email is already in use. Please use a different email.';
				break;
			case target.includes('User_phone_key'):
				message =
					'Phone number is already in use. Please use a different number.';
				break;
			case target.includes('Category_name_key'):
				message =
					'Category name is already in use. Please use a different name.';
				break;
			default:
				message =
					'A unique constraint failed. Please ensure all fields are unique.';
		}

		return next(createError(400, message));
	}

	return next(error); // Handle other errors
};
