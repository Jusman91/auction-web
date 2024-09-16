import * as Yup from 'yup';
import { customValidationReqBody } from './customValidationReqBody';
import { authValidationSchema } from './schema/auth';
import { userValidationSchema } from './schema/user';
import { categoryValidationSchema } from './schema/category';
import { auctionItemValidationSchema } from './schema/auctionItem';

export const validationBody = {
	auth: {
		register: customValidationReqBody(
			authValidationSchema(
				'register',
			) as unknown as Yup.ObjectSchema<any>,
		),
		login: customValidationReqBody(
			authValidationSchema(
				'login',
			) as unknown as Yup.ObjectSchema<any>,
		),
		forgotPassword: customValidationReqBody(
			authValidationSchema(
				'forgot-password',
			) as unknown as Yup.ObjectSchema<any>,
		),
		resetPassword: customValidationReqBody(
			authValidationSchema(
				'reset-password',
			) as unknown as Yup.ObjectSchema<any>,
		),
	},
	user: {
		create: customValidationReqBody(
			authValidationSchema(
				'register',
			) as unknown as Yup.ObjectSchema<any>,
		),
		update: customValidationReqBody(userValidationSchema),
	},
	category: {
		create: customValidationReqBody(
			categoryValidationSchema(
				'create',
			) as unknown as Yup.ObjectSchema<any>,
		),
		update: customValidationReqBody(
			categoryValidationSchema(
				'update',
			) as unknown as Yup.ObjectSchema<any>,
		),
	},
	auctionItem: {
		create: customValidationReqBody(
			auctionItemValidationSchema(
				'create',
			) as unknown as Yup.ObjectSchema<any>,
		),
		update: customValidationReqBody(
			auctionItemValidationSchema(
				'update',
			) as unknown as Yup.ObjectSchema<any>,
		),
	},
};
