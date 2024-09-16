import jwt from 'jsonwebtoken';
import {
	ACCESS_TOKEN_SECRET_KEY,
	ACTIVE_TOKEN_SECRET_KEY,
	FORGOT_PASSWORD_TOKEN_SECRET_KEY,
	REFRESH_TOKEN_SECRET_KEY,
} from '../../config/env';

export const generateActiveToken = (payload: object) => {
	return jwt.sign(payload, `${ACTIVE_TOKEN_SECRET_KEY}`, {
		expiresIn: '5m',
	});
};
export const generateAccessToken = (payload: object) => {
	return jwt.sign(payload, `${ACCESS_TOKEN_SECRET_KEY}`, {
		expiresIn: '1d',
	});
};
export const generateRefreshToken = (payload: object) => {
	return jwt.sign(payload, `${REFRESH_TOKEN_SECRET_KEY}`, {
		expiresIn: '30d',
	});
};
export const generateForgotPasswordToken = (
	payload: object,
) => {
	return jwt.sign(
		payload,
		`${FORGOT_PASSWORD_TOKEN_SECRET_KEY}`,
		{
			expiresIn: '5m',
		},
	);
};
