import * as Yup from 'yup';
import { ValidationName } from '../../../../types';

export const auctionItemValidationSchema = (
	validationName: ValidationName,
) => {
	let schema = {};
	switch (validationName) {
		case 'create':
			return (schema = Yup.object().shape({
				name: Yup.string()
					.trim()
					.min(3, 'Name must be at least 3 characters')
					.max(30, 'Name is up to 30 characters')
					.required('Name is required'),
				description: Yup.string()
					.trim()
					.max(
						300,
						'Description cannot exceed 300 characters',
					)
					.required('Description is required'),
				category: Yup.string().required(
					'Category is required',
				),
				startingBid: Yup.number().required(
					'Starting bid is required',
				),
				currentBid: Yup.number(),
				startTime: Yup.date()
					.typeError('Start time must be a valid date')
					.min(
						new Date(),
						'Start time must be in the future',
					)
					.required('Start time is required'),
				endTime: Yup.date()
					.typeError('End time must be a valid date')
					.required('End time is required')
					.when(
						'startTime',
						(value: any, schema: Yup.DateSchema) => {
							const startTime = value as Date;
							return startTime
								? schema.min(
										startTime,
										'End time must be after the start time',
								  )
								: schema;
						},
					),
			}));
		case 'update':
			return (schema = Yup.object().shape({
				name: Yup.string()
					.trim()
					.min(3, 'Name must be at least 3 characters')
					.max(30, 'Name is up to 30 characters'),
				description: Yup.string()
					.trim()
					.max(
						300,
						'Description cannot exceed 300 characters',
					),
				category: Yup.string(),
				startingBid: Yup.number(),
				currentBid: Yup.number(),
				startTime: Yup.date()
					.typeError('Start time must be a valid date')
					.min(
						new Date(),
						'Start time must be in the future',
					),
				endTime: Yup.date()
					.typeError('End time must be a valid date')
					.when(
						'startTime',
						(value: any, schema: Yup.DateSchema) => {
							const startTime = value as Date;
							return startTime
								? schema.min(
										startTime,
										'End time must be after the start time',
								  )
								: schema;
						},
					),
			}));

		default:
			return schema;
	}
};
