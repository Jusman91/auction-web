import { convertToNumber } from '../convertToNumber';

type BidRange = {
	gte?: number;
	lte?: number;
};

export const handleBidRange = (
	minBid: string,
	maxBid: string,
): BidRange => {
	const result: BidRange = {};

	if (minBid) result.gte = convertToNumber(minBid); // Greater than or equal
	if (maxBid) result.lte = convertToNumber(maxBid); // Less than or equal

	return result;
};
