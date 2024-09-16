import { RequestHandler } from 'express';
import prisma from '../../lib/prisma';
import { createError } from '../../middleware';

export const deleteCategoroy: RequestHandler = async (
	req,
	res,
	next,
) => {
	const { id } = req.params;
	try {
		const existingCategory =
			await prisma.category.findUnique({
				where: {
					id,
				},
			});
		if (!existingCategory)
			return next(createError(404, 'Category not found'));

		await prisma.category.delete({
			where: {
				id,
			},
		});

		res
			.status(200)
			.json({ message: 'Category deleted successfully' });
	} catch (error) {
		console.log(
			'Error in deleteCategoroy controller',
			error,
		);
		next(error);
	}
};
