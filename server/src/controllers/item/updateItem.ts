import { RequestHandler } from 'express';
import prisma from '../../lib/prisma';
import { createError } from '../../middleware';
import {
	generateUniqueSlug,
	parseDateString,
	validationBody,
} from '../../lib/utils';

export const updateItem: RequestHandler = async (
	req,
	res,
	next,
) => {
	const { slug } = req.params;
	const { name, startTime, endTime } = req.body;
	try {
		const parsedStartTime = parseDateString(startTime);
		const parsedEndTime = parseDateString(endTime);

		await validationBody.auctionItem.update(req.body);
		const existingItem =
			await prisma.auctionItem.findUnique({
				where: {
					slug,
				},
			});
		if (!existingItem)
			return next(createError(404, 'Item not found'));

		const newSlug = await generateUniqueSlug({
			modelName: 'AuctionItem',
			name,
		});
		const data = await prisma.auctionItem.update({
			where: {
				slug,
			},
			data: {
				...req.body,
				slug: newSlug,
				startTime: parsedStartTime as Date,
				endTime: parsedEndTime as Date,
			},
		});
		console.log(data);

		res
			.status(200)
			.json({ message: 'Item updated successfully' });
	} catch (error) {
		console.log('Error in updateItem controller', error);
		next(error);
	}
};
