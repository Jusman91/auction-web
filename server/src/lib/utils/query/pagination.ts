import { Pagination } from '../../../types';

export const pagination = ({ page, limit }: Pagination) => {
	const currentPage = parseInt(page as string) || 1;
	const take = parseInt(limit as string) || 10;
	const skip = (currentPage - 1) * take;

	return {
		currentPage,
		take,
		skip,
	};
};
