import { RequestHandler } from 'express';
import { verifyToken } from './verifyToken';
import { IUserRequest } from '../types';
import { createError } from './error';

export const verifyAdmin: RequestHandler = (
	req: IUserRequest,
	res,
	next,
) => {
	verifyToken(req, res, () => {
		const role = req.user?.role;
		if (role === 'Admin') {
			next();
		} else {
			return next(
				createError(403, 'You are not authorized'),
			);
		}
	});
};
