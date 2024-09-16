import * as Yup from 'yup';
import { validationSchema } from '../../../types';
import { createError } from '../../../middleware';

export const customValidationReqBody =
	(schema: Yup.ObjectSchema<any>): validationSchema =>
	async (data: any) => {
		try {
			await schema.validate(data, { abortEarly: false });
			return null;
		} catch (error: any) {
			if (error.inner && error.inner.length > 0) {
				// Ambil semua pesan kesalahan dan simpan dalam array
				const validationErrors: string[] = error.inner.map(
					(err: Yup.ValidationError) => err.message,
				);

				throw createError(
					422,
					validationErrors.length === 1
						? validationErrors[0]
						: validationErrors,
				); // 422 Unprocessable Entity
			}
		}
	};
