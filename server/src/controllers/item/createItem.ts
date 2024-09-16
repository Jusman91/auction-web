import { RequestHandler } from 'express';
import {
	generateUniqueSlug,
	parseDateString,
	validationBody,
} from '../../lib/utils';
import prisma from '../../lib/prisma';

export const createItem: RequestHandler = async (
	req,
	res,
	next,
) => {
	const { auctioneerId } = req.params;
	const {
		name,
		description,
		category,
		thumbnail,
		images,
		startingBid,
		currentBid,
		startTime,
		endTime,
	} = req.body;
	try {
		const parsedStartTime = parseDateString(startTime);
		const parsedEndTime = parseDateString(endTime);

		await validationBody.auctionItem.create(req.body);
		const createSlug = await generateUniqueSlug({
			modelName: 'AuctionItem',
			name,
		});

		await prisma.auctionItem.create({
			data: {
				name,
				slug: createSlug!,
				description,
				category,
				thumbnail,
				images,
				startingBid,
				currentBid,
				startTime: parsedStartTime as Date,
				endTime: parsedEndTime as Date,
				auctioneerId,
			},
		});

		res
			.status(201)
			.json({ message: 'Item created successfully' });
	} catch (error) {
		console.log('Error in createItem controller', error);
		next(error);
	}
};
