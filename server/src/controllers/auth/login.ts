import { RequestHandler } from 'express';
import {
	comparePassword,
	generateAccessToken,
	generateRefreshToken,
	validationBody,
} from '../../lib/utils';
import prisma from '../../lib/prisma';
import { createError } from '../../middleware';
import { BASE_URL } from '../../config/env';

export const login: RequestHandler = async (
	req,
	res,
	next,
) => {
	const { email, password } = req.body;
	try {
		await validationBody.auth.login(req.body);
		const existingUser = await prisma.user.findUnique({
			where: { email },
		});
		if (!existingUser)
			return next(createError(404, 'User does not exist'));

		await comparePassword(password, existingUser.password);

		const accessToken = generateAccessToken({
			id: existingUser.id,
			slug: existingUser.slug,
			role: existingUser.role,
		});
		const refresToken = generateRefreshToken({
			id: existingUser.id,
			slug: existingUser.slug,
			role: existingUser.role,
		});

		res.cookie('refreshtoken', refresToken, {
			httpOnly: true,
			path: `${BASE_URL}/auth/refresh-token`,
			maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
			secure: process.env.NODE_ENV === 'production',
		});

		res.status(200).json({
			message: 'Login successful',
			accessToken,
		});
	} catch (error) {
		console.log(error);
		next(error);
	}
};
