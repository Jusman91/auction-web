import {
	BuildCondition,
	StringFilter,
} from '../../../types';

export const buildStringCondition = ({
	value,
	isInsensitive = true,
}: BuildCondition): StringFilter => {
	return {
		contains: value,
		mode: isInsensitive ? 'insensitive' : undefined,
	};
};
