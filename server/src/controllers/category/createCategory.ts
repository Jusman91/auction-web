import { RequestHandler } from 'express';
import {
	prismaError,
	validationBody,
} from '../../lib/utils';
import prisma from '../../lib/prisma';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

export const createCategory: RequestHandler = async (
	req,
	res,
	next,
) => {
	const { name } = req.body;
	try {
		await validationBody.category.create(req.body);
		await prisma.category.create({
			data: {
				name,
			},
		});

		res
			.status(201)
			.json({ message: 'Category created successfully' });
	} catch (error) {
		console.log(
			'Error in createCategory controller:',
			error,
		);
		if (error instanceof PrismaClientKnownRequestError) {
			prismaError(error, next);
		} else {
			next(error);
		}
	}
};
