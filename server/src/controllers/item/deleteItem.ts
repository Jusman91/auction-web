import { RequestHandler } from 'express';
import prisma from '../../lib/prisma';
import { createError } from '../../middleware';

export const deleteItem: RequestHandler = async (
	req,
	res,
	next,
) => {
	const { slug } = req.params;
	try {
		const existingItem =
			await prisma.auctionItem.findUnique({
				where: {
					slug,
				},
			});
		if (!existingItem)
			return next(createError(404, 'Item not found'));

		await prisma.auctionItem.delete({
			where: {
				slug,
			},
		});

		res
			.status(201)
			.json({ message: 'Item deleted successfully' });
	} catch (error) {
		console.log('Error in deleteItem controller', error);
		next(error);
	}
};
