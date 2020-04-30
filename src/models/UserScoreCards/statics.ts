import { UserScoreCardCollection, ScoreCard } from "./interface";
import { Practices } from "..";
import { DAY_IN_MS, aggregatePractices, DAY, WEEK, MONTH, YEAR } from "./utils";

/**
 * Logs that user is active right now
 * A bit redundant to do this for each
 * activity this could be cached easily
 * @param userId
 */
export const logActivity = async function (
	this: UserScoreCardCollection,
	userId: string
) {
	try {
		const card = await this.findOne({
			user: userId,
		});
		const now = new Date();
		const daysSinceActive =
			(now.getTime() - card.lastLoggedIn.getTime()) / DAY_IN_MS;
		card.lastLoggedIn = now;
		if (daysSinceActive > 2) card.loginStreak = 1;
		else if (daysSinceActive > 1) card.loginStreak++;
		await card.save();
	} catch (error) {
		// failure
	}
};

/**
 * generates a score card for a single users
 * @param userId users id
 */
export const generateScoreCard = async function (
	this: UserScoreCardCollection,
	userId: any
): Promise<ScoreCard> {
	const [practices, scoreCard] = await Promise.all([
		Practices.find({ user: userId }),
		this.findOne({ user: userId }).lean(),
	]);

	return {
		...scoreCard,
		intervals: {
			today: aggregatePractices(practices, DAY),
			thisWeek: aggregatePractices(practices, WEEK),
			thisMonth: aggregatePractices(practices, MONTH),
			thisYear: aggregatePractices(practices, YEAR),
			sinceBeginning: aggregatePractices(practices),
		},
	};
};
