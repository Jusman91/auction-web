import { RequestHandler } from 'express';
import { BASE_URL } from '../../config/env';

export const logout: RequestHandler = async (
	req,
	res,
	next,
) => {
	try {
		res.clearCookie('refreshtoken', {
			path: `${BASE_URL}/auth/refresh-token`,
		});
		return res
			.status(200)
			.json({ message: 'Logged out successfully' });
	} catch (error) {
		next(error);
	}
};
