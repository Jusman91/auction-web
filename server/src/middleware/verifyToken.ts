import { RequestHandler } from 'express';
import { IUserPayload, IUserRequest } from '../types';
import jwt from 'jsonwebtoken';
import {
	ACCESS_TOKEN_SECRET_KEY,
	FORGOT_PASSWORD_TOKEN_SECRET_KEY,
} from '../config/env';
import { createError } from './error';

export const verifyToken: RequestHandler = (
	req: IUserRequest,
	res,
	next,
) => {
	const authHeader =
		req.headers.authorization || req.headers.Authorization;
	if (authHeader && typeof authHeader === 'string') {
		const token = authHeader.split(' ')[1];
		try {
			const decoded = jwt.verify(
				token,
				`${ACCESS_TOKEN_SECRET_KEY}`,
			) as IUserPayload;
			req.user = decoded;
			console.log('Decoded Token: ', decoded);
			next();
		} catch (error) {
			next(createError(403, 'Token is not valid'));
		}
	} else return next(createError(401, 'Unauthorized'));
};

export const verifyTokenResetPassword = async (
	token: string,
	id: string,
) => {
	try {
		const decoded = jwt.verify(
			token,
			`${FORGOT_PASSWORD_TOKEN_SECRET_KEY}`,
		) as IUserPayload;
		if (decoded.id !== id) {
			throw createError(401, 'Invalid token');
		}
	} catch (error) {
		throw createError(401, 'Invalid or expired token');
	}
};
