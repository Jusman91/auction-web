import * as Yup from 'yup';
import { customValidationReqBody } from './customValidationReqBody';
import { authValidationSchema } from './schema/auth';

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
	// user: {
	// 	create: customValidationReqBody(
	// 		authValidationSchema(
	// 			'register',
	// 		) as unknown as Yup.ObjectSchema<any>,
	// 	),
	// 	update: customValidationReqBody(userValidationSchema),
	// },
};
