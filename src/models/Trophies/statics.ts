import {
	TrophyColllectionInterface,
	UserScoreCards,
	Rules,
	UserTrophies,
} from "../";

/**
 * checks all trophies and compares them
 * to the user score card to see if a
 * trophy should be handed out or not
 *
 * @param this type decleration for cntext
 * @param userId the user to allocate trophies to
 */
export const allocateNewTrophiesToUser = async function (
	this: TrophyColllectionInterface,
	userId: string
) {
	// fins all trophies and populates rules
	const trophies = await this.find().populate("rules");
	// gets the score card for user
	const scoreCard = await UserScoreCards.generateScoreCard(userId);

	// key is the trophyId and value is true only if user has that troophy
	const userTrophyDict: { [key: string]: boolean } = {};
	// gets all user trophies for that user
	const userTrophies = await UserTrophies.find({ user: userId }).lean();
	// iterate through user trophies and mark "gotten" as true
	userTrophies.forEach(
		(item) => (userTrophyDict[item.trophy.toString()] = true)
	);
	// filter trophies that
	const newTrophies = trophies.filter((trophy) => {
		// i) the user already has
		if (userTrophyDict[trophy._id.toString()]) return false;
		// ii) the has not met the conditions for
		return Rules.reviewObject(scoreCard, trophy.rules);
	});

	// remaining newTrophies is an array of trophies that the user gets
	const promises = newTrophies.map((item) => {
		return UserTrophies.create({
			trophy: item._id,
			user: userId,
		});
	});
	// promise all to save time
	await Promise.all(promises);
	//return the trophies
	return newTrophies;
};
