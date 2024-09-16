import { RequestHandler } from 'express';
import { IUserRequest } from '../../types';
import { createError } from '../../middleware';
import prisma from '../../lib/prisma';
import { isValidObjectId } from '../../lib/utils';

export const loggedIn: RequestHandler = async (
	req: IUserRequest,
	res,
	next,
) => {
	try {
		const { id } = req.user!;
		if (!isValidObjectId(id))
			return next(createError(404, 'User not found'));

		const user = await prisma.user.findUnique({
			where: { id },
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
		next(error);
	}
};
