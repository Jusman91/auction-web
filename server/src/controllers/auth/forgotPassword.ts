import { RequestHandler } from 'express';
import { IUserRequest } from '../../types';
import {
	generateForgotPasswordToken,
	validationBody,
} from '../../lib/utils';
import prisma from '../../lib/prisma';
import { createError } from '../../middleware';
import { CLIENT_URL } from '../../config/env';
import { sendEmail } from '../../lib/nodemailer';

export const forgotPassword: RequestHandler = async (
	req: IUserRequest,
	res,
	next,
) => {
	const { email } = req.body;
	try {
		await validationBody.auth.forgotPassword(req.body);
		const existingUser = await prisma.user.findUnique({
			where: { email },
		});
		if (!existingUser)
			return next(createError(404, 'User does not exist'));

		const token = generateForgotPasswordToken({
			id: existingUser.id,
			slug: existingUser.slug,
			role: existingUser.role,
		});
		const url = `${CLIENT_URL}/auth/reset-password/${existingUser.id}/${token}`;

		console.log('Generated token:', token);
		console.log('Reset URL:', url);
		await sendEmail({
			to: existingUser.email,
			subject: 'Forgot_Password',
			url: url,
			btnText: 'Reset Password',
		});

		res.status(200).json({
			message: 'Success! Please check your email',
		});
	} catch (error) {
		next(error);
	}
};
