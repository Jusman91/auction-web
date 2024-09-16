import { RequestHandler } from 'express';
import { validationBody } from '../../lib/utils';
import prisma from '../../lib/prisma';
import { createError } from '../../middleware';

export const updateCategory: RequestHandler = async (
	req,
	res,
	next,
) => {
	const { id } = req.params;
	try {
		await validationBody.category.update(req.body);
		const existingCaegory =
			await prisma.category.findUnique({
				where: {
					id,
				},
			});
		if (!existingCaegory)
			return next(createError(404, 'Category not found'));

		const updateCategory = await prisma.category.update({
			where: {
				id,
			},
			data: {
				...req.body,
			},
		});
		console.log(updateCategory);
		res
			.status(200)
			.json({ message: 'Category update successfully' });
	} catch (error) {
		console.log('Error updating category', error);
		next(error);
	}
};
