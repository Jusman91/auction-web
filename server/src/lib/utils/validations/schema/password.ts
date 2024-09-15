import * as Yup from 'yup';

export const passwordSchema = Yup.string()
	.min(6, 'Password must be at least 6 characters')
	.min(8, 'Password must be at least 8 characters')
	.matches(
		/[a-z]/,
		'Password must contain at least one lowercase letter',
	)
	.matches(
		/[A-Z]/,
		'Password must contain at least one uppercase letter',
	)
	.matches(
		/\d/,
		'Password must contain at least one number',
	)
	.required('password is required');
