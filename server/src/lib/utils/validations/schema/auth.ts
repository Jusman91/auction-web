import * as Yup from 'yup';
import { AuthValidationName } from '../../../../types';
import { passwordSchema } from './password';
import { phoneSchema } from './phone';

export const authValidationSchema = (
	validationName: AuthValidationName,
) => {
	let schema = {};
	switch (validationName) {
		case 'register':
			return (schema = Yup.object().shape({
				name: Yup.string()
					.trim()
					.min(3, 'Name must be at least 3 characters')
					.max(15, 'Name is up to 15 characters')
					.required('Name is required'),
				email: Yup.string()
					.email('Invalid email address')
					.required('Email is required'),
				password: passwordSchema,
				phone: phoneSchema('create'),
				address: Yup.string()
					.trim()
					.required('Address is required')
					.max(100, 'Address is too long'),
				role: Yup.string().oneOf(
					['Auctioneer', 'Bedder', 'Admin'],
					'Invalid role',
				),
			}));
		case 'login':
			return (schema = Yup.object().shape({
				email: Yup.string()
					.email('Invalid email address')
					.required('Email is required'),
				password: Yup.string().required(
					'Password is required',
				),
			}));
		case 'forgot-password':
			return (schema = Yup.object().shape({
				email: Yup.string()
					.email('Invalid email address')
					.required('Email is required'),
			}));
		case 'reset-password':
			return (schema = Yup.object().shape({
				password: passwordSchema,
			}));
		default:
			return schema;
	}
};
