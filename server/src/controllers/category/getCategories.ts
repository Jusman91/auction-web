import { RequestHandler } from 'express';
import prisma from '../../lib/prisma';

export const getCategories: RequestHandler = async (
	req,
	res,
	next,
) => {
	try {
		const categories = await prisma.category.findMany();
		res.status(200).json({ categories });
	} catch (error) {
		console.log('Error in getCategories controller', error);
		next(error);
	}
};
