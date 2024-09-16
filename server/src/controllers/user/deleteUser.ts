import { RequestHandler } from 'express';
import { createError } from '../../middleware';
import prisma from '../../lib/prisma';

export const deleteUser: RequestHandler = async (
	req,
	res,
	next,
) => {
	const { slug } = req.params;
	try {
		const existingUser = await prisma.user.findUnique({
			where: {
				slug,
			},
		});

		if (!existingUser) {
			return next(createError(404, 'User not found'));
		}
		await prisma.user.delete({
			where: {
				slug,
			},
		});

		res
			.status(201)
			.json({ message: 'User deleted successfully' });
	} catch (error) {
		console.log('Error deleting user', error);
		next(error);
	}
};
