import { RequestHandler } from 'express';
import { IUserRequest } from '../../types';
import {
	encryptPassword,
	validationBody,
} from '../../lib/utils';
import { verifyTokenResetPassword } from '../../middleware';
import prisma from '../../lib/prisma';

export const resetPassword: RequestHandler = async (
	req: IUserRequest,
	res,
	next,
) => {
	const { id, token } = req.params;
	const { password } = req.body;
	try {
		await validationBody.auth.resetPassword(req.body);
		await verifyTokenResetPassword(token, id);

		const hashedPassword = await encryptPassword(password);

		await prisma.user.update({
			where: { id },
			data: {
				password: hashedPassword,
			},
		});

		res
			.status(200)
			.json({ message: 'Reset password success' });
	} catch (error) {
		next(error);
	}
};
