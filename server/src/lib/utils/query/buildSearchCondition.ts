import {
	BuildFilterAndSearchConditionReturn,
	BuildSearchCondition,
} from '../../../types';
import { buildStringCondition } from './buildStringCondition';

export const buildSearchCondition = ({
	search,
	fields,
}: BuildSearchCondition): BuildFilterAndSearchConditionReturn => {
	if (!search) return {};

	return {
		OR: fields.map((field) => {
			console.log('field', field);
			return {
				[field]: buildStringCondition({
					value: search,
				}),
			};
		}),
	};
};
