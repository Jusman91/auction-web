import * as Yup from 'yup';
import { ValidationName } from '../../../../types';

export const phoneSchema = (
	validationName: ValidationName,
) => {
	let schema = {};
	switch (validationName) {
		case 'create':
			return (schema = Yup.string()
				.required('Phone number is required')
				.min(10, 'Phone number must be at least 10 digits')
				.max(15, 'Phone number can be up to 15 digits')
				.matches(
					/^\+62/,
					'Phone number must start with +62',
				));
		case 'update':
			return (schema = Yup.string()
				.min(10, 'Phone number must be at least 10 digits')
				.max(15, 'Phone number can be up to 15 digits')
				.matches(
					/^\+62/,
					'Phone number must start with +62',
				));
	}
};
