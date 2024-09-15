import { RequestHandler } from 'express';
import {
	generateUniqueSlug,
	validationBody,
} from '../../lib/utils';
import { createError } from '../../middleware';
import prisma from '../../lib/prisma';

export const udpateUser: RequestHandler = async (
	req,
	res,
	next,
) => {
	const { slug } = req.params;
	const { name } = req.body;
	try {
		await validationBody.user.update(req.body);
		const existingUser = await prisma.user.findUnique({
			where: {
				slug,
			},
		});
		if (!existingUser)
			return next(createError(404, 'User not found'));

		const newSlug = await generateUniqueSlug({
			modelName: 'User',
			name: name,
		});

		const updateUser = await prisma.user.update({
			where: {
				slug,
			},
			data: {
				...req.body,
				slug: newSlug,
			},
		});
		console.log(updateUser);
		res
			.status(200)
			.json({ message: 'User update successfully' });
	} catch (error) {
		console.log('Error updating user', error);
		next(error);
	}
};
