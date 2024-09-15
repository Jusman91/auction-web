import { RequestHandler } from 'express';
import { IUserRequest } from '../types';
import { verifyToken } from './verifyToken';
import { createError } from './error';

export const verifyUser: RequestHandler = (
	req: IUserRequest,
	res,
	next,
) => {
	verifyToken(req, res, async () => {
		try {
			const slug = req.user?.slug;
			const role = req.user?.role;
			const userValid =
				slug === req.params.slug || role === 'Admin';

			if (userValid) {
				next();
			} else {
				return next(
					createError(403, 'You are not authorized'),
				);
			}
		} catch (error) {
			console.log('Error in verifyUser', error);
			next(error);
		}
	});
};
