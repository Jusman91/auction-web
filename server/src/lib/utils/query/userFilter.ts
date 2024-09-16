import { Query, UserWhereInput } from '../../../types';
import { buildEnumConditon } from './buildEnumCondition';
import { buildStringCondition } from './buildStringCondition';

export const userFilter = ({
	query,
}: Query): UserWhereInput => {
	const { name, phone, role, email, address } = query;

	if (!query) return {};

	const filterCondition: UserWhereInput = {};
	if (name)
		filterCondition.name = buildStringCondition({
			value: name as string,
		});
	if (email)
		filterCondition.email = buildStringCondition({
			value: email as string,
		});
	if (address)
		filterCondition.address = buildStringCondition({
			value: address as string,
		});
	if (phone)
		filterCondition.phone = buildStringCondition({
			value: phone as string,
		});
	if (role)
		filterCondition.role = buildEnumConditon({
			value: role as string,
		});

	return filterCondition;
};
