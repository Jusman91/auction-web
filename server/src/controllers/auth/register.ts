import { RequestHandler } from 'express';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import prisma from '../../lib/prisma';
import {
	encryptPassword,
	generateUniqueSlug,
	prismaError,
	validationBody,
} from '../../lib/utils';

export const register: RequestHandler = async (
	req,
	res,
	next,
) => {
	const {
		name,
		email,
		password,
		phone,
		address,
		profilePic,
		role,
	} = req.body;
	try {
		await validationBody.auth.register(req.body);
		const createSlug = await generateUniqueSlug({
			modelName: 'User',
			name: name,
		});
		const hashedPassword = await encryptPassword(password);

		await prisma.user.create({
			data: {
				name,
				email,
				password: hashedPassword,
				slug: createSlug!,
				phone,
				address,
				role,
				profilePic: profilePic || null,
			},
		});

		res
			.status(200)
			.json({ message: 'User created successfully' });
	} catch (error) {
		console.log('Error in register controller:', error);
		if (error instanceof PrismaClientKnownRequestError) {
			prismaError(error, next); // for email, name or data with unique key retruns error already exists
		} else {
			next(error);
		}
	}
};
