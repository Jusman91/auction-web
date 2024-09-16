import { RequestHandler } from 'express';
import { buildQuery } from '../../lib/utils';
import prisma from '../../lib/prisma';
import { OrderByWithRelationInput } from '../../types';

export const getItems: RequestHandler = async (
	req,
	res,
	next,
) => {
	try {
		const query = req.query;
		const {
			filterCondition,
			sort,
			currentPage,
			skip,
			take,
		} = buildQuery({
			query,
			fields: ['name', 'category'],
		});

		const item = await prisma.auctionItem.findMany({
			where: filterCondition,
			skip,
			take,
			orderBy: sort as OrderByWithRelationInput,
		});

		const totalItem = await prisma.auctionItem.count({
			where: filterCondition,
		});

		const totalPages = Math.ceil(totalItem / take);

		res.status(200).json({
			data: item,
			currentPage,
			totalPages,
			totalItem,
		});
	} catch (error) {
		console.log('Error in getItems controller', error);
		next(error);
	}
};
