import { NextFunction, Request, Response } from 'express';
import { ICustomError } from '../types';

export const createError = (
	status: number,
	message: string | string[],
): ICustomError => {
	const err = new Error() as ICustomError;
	err.status = status;
	if (Array.isArray(message)) {
		err.messages = message;
	} else {
		err.message = message;
	}
	return err;
};

export const errorHandler = (
	err: ICustomError,
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	const errStatus = err.status || 500;
	const errMessage =
		err.message || err.messages || 'Something went wrong!';
	return res.status(errStatus).json({
		success: false,
		status: errStatus,
		message: errMessage,
		stack: err.stack,
	});
};
