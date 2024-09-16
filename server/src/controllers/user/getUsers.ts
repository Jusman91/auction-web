import { RequestHandler } from 'express';
import prisma from '../../lib/prisma';
import { buildQuery } from '../../lib/utils';
import { OrderByWithRelationInput } from '../../types';

export const getUsers: RequestHandler = async (
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
			fields: ['name', 'email', 'phone', 'address'],
		});

		const users = await prisma.user.findMany({
			where: filterCondition,
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
			skip,
			take,
			orderBy: sort as OrderByWithRelationInput,
		});

		const totalUsers = await prisma.user.count({
			where: filterCondition,
		});

		const totalPages = Math.ceil(totalUsers / take);

		res.status(200).json({
			data: users,
			currentPage,
			totalPages,
			totalUsers,
		});
	} catch (error) {
		console.log('error in get users: ', error);
		next(error);
	}
};
