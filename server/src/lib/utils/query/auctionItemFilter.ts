import {
	AuctionItemWhereInput,
	Query,
} from '../../../types';
import { parseDateString } from '../dateUtils';
import { buildStringCondition } from './buildStringCondition';
import { handleBidRange } from './handleBidRange';

export const auctionItemFilter = ({
	query,
}: Query): AuctionItemWhereInput => {
	const {
		name,
		category,
		minStartingBid,
		maxStartingBid,
		minCurrentBid,
		maxCurrentBid,
		startTime,
		endTime,
	} = query;

	if (!query) return {};

	const filterCondition: AuctionItemWhereInput = {};

	if (name)
		filterCondition.name = buildStringCondition({
			value: name as string,
		});
	if (category)
		filterCondition.category = buildStringCondition({
			value: category as string,
		});

	if (minStartingBid || maxStartingBid)
		filterCondition.startingBid = handleBidRange(
			minStartingBid as string,
			maxStartingBid as string,
		);
	if (minCurrentBid || maxCurrentBid)
		filterCondition.currentBid = handleBidRange(
			minCurrentBid as string,
			maxCurrentBid as string,
		);

	if (startTime) {
		filterCondition.startTime = {
			gte: parseDateString(startTime as string), // Start time lebih besar atau sama dengan
		};
	}

	if (endTime) {
		filterCondition.endTime = {
			lte: parseDateString(endTime as string), // End time lebih kecil atau sama dengan
		};
	}

	return filterCondition;
};
