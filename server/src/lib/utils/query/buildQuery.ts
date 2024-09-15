import {
	BuildQuery,
	FilterCondition,
} from '../../../types';
import { buildSearchCondition } from './buildSearchCondition';
import { buildSortCondition } from './buildSortCondition';

import { pagination } from './pagination';
import { userFilter } from './userFilter';

export const buildQuery = ({
	query,
	fields,
}: BuildQuery) => {
	const { search, sort, order, page, limit } = query;
	const filterCondition = {
		...userFilter({ query }),
		...buildSearchCondition({
			fields,
			search: search as string,
		}),
	} as FilterCondition;

	const { currentPage, skip, take } = pagination({
		page: page as string,
		limit: limit as string,
	});

	const sortConditions = buildSortCondition({
		sort: sort as string[],
		order: order as string[],
	});

	return {
		filterCondition,
		sort: sortConditions,
		currentPage,
		skip,
		take,
	};
};
