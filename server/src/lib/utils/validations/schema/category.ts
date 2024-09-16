import * as Yup from 'yup';
import { ValidationName } from '../../../../types';

export const categoryValidationSchema = (
	validationName: ValidationName,
) => {
	let schema = {};
	switch (validationName) {
		case 'create':
			return (schema = Yup.object().shape({
				name: Yup.string()
					.trim()
					.required('Name is required'),
			}));
		case 'update':
			return (schema = Yup.object().shape({
				name: Yup.string().trim(),
			}));
		default:
			return schema;
	}
};
