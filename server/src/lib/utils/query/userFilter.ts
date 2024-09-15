import { Query, UserWhereInput } from '../../../types';
import { buildEnumConditon } from './buildEnumCondition';
import { buildStringCondition } from './buildStringCondition';

export const userFilter = ({
	query,
}: Query): UserWhereInput => {
	const { name, phone, role, email, address } = query;

	if (!query) return {};

	return {
		...(name && {
			name: buildStringCondition({
				value: name as string,
			}),
		}),
		...(email && {
			email: buildStringCondition({
				value: email as string,
			}),
		}),
		...(address && {
			address: buildStringCondition({
				value: address as string,
			}),
		}),
		...(phone && {
			phone: buildStringCondition({
				value: phone as string,
			}),
		}),
		...(role && {
			role: buildEnumConditon({ value: role as string }),
		}),
	};
};
