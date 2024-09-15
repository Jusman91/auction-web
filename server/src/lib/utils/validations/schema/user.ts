import * as Yup from 'yup';
import { phoneSchema } from './phone';

export const userValidationSchema = Yup.object().shape({
	name: Yup.string()
		.trim()
		.min(3, 'Name must be at least 3 characters')
		.max(15, 'Name is up to 15 characters'),
	phone: phoneSchema('update'),
	address: Yup.string()
		.trim()
		.max(100, 'Address is too long'),
});
