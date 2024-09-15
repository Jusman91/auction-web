import { RequestHandler } from 'express';
import { createError } from '../../middleware';
import prisma from '../../lib/prisma';

export const getUser: RequestHandler = async (
	req,
	res,
	next,
) => {
	const { slug } = req.params;
	try {
		const user = await prisma.user.findUnique({
			where: { slug },
			select: {
				id: true,
				slug: true,
				name: true,
				email: true,
				address: true,
				phone: true,
				profilePic: true,
				role: true,
				createdAt: true,
				updatedAt: true,
			},
		});

		if (!user)
			return next(createError(404, 'User not found'));

		res.status(200).json(user);
	} catch (error) {
		console.log('Error getting user', error);
		next(error);
	}
};
