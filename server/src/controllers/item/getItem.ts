import { RequestHandler } from 'express';
import prisma from '../../lib/prisma';
import { createError } from '../../middleware';

export const getItem: RequestHandler = async (
	req,
	res,
	next,
) => {
	const { slug } = req.params;
	try {
		const item = await prisma.auctionItem.findUnique({
			where: {
				slug,
			},
			include: {
				bids: true,
				auctioneer: {
					select: {
						id: true,
						name: true,
						email: true,
						phone: true,
						profilePic: true,
					},
				},
			},
		});

		if (!item)
			return next(createError(404, 'Item not found'));

		res.status(200).json(item);
	} catch (error) {
		console.log('Error in getItem controller', error);
		next(error);
	}
};
