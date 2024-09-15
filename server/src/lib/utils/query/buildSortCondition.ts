import { BuildSortCondition } from '../../../types';

export const buildSortCondition = ({
	sort,
	order,
}: BuildSortCondition) => {
	if (!sort || !order) {
		return [];
	}

	// change sort dan order to array, for consistency
	const sortArray = Array.isArray(sort) ? sort : [sort];
	const orderArray = Array.isArray(order) ? order : [order];

	// single sort > example: sort=name&order=asc
	// multiple sort > example: sort=name&sort=city&order=asc&order=desc
	const sortConditions = sortArray.map(
		(sortField, index) => {
			const sortOrder =
				orderArray[index] === 'desc' ? 'desc' : 'asc';
			console.log('sortOrder', sortOrder);
			return {
				[sortField]: sortOrder,
			};
		},
	);

	return sortConditions;
};
