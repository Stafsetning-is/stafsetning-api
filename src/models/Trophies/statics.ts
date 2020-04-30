import {
	TrophyColllectionInterface,
	UserScoreCards,
	Rules,
	UserTrophies,
} from "../";

export const allocateNewTrophiesToUser = async function (
	this: TrophyColllectionInterface,
	userId: string
) {
	const trophies = await this.find().populate("rules");
	const scoreCard = await UserScoreCards.generateScoreCard(userId);

	const userTrophyDict: { [key: string]: boolean } = {};
	const userTrophies = await UserTrophies.find({ user: userId }).lean();

	userTrophies.forEach(
		(item) => (userTrophyDict[item.trophy.toString()] = true)
	);

	const newTrophies = trophies.filter((trophy) => {
		if (userTrophyDict[trophy._id.toString()]) return false;
		return Rules.reviewObject(scoreCard, trophy.rules);
	});

	const promises = newTrophies.map((item) =>
		UserTrophies.create({
			trophy: item._id,
			user: userId,
		})
	);

	await Promise.all(promises);

	return newTrophies;
};
