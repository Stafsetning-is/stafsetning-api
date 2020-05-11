import { UserTrophiesCollection } from "./interface";
import { Trophies } from "../";

/**
 * takes in a user id and hands out
 * a trophy if a trophy has not been "seen" yet
 * @param this type decleration for this
 * @param userId users id
 */
export const handOutTrophyToUser = async function (
	this: UserTrophiesCollection,
	userId: string
) {
	try {
		// finds unseen user trophies and marks it as seen
		const userTrophy = await this.findOneAndUpdate(
			{ user: userId, seen: false },
			{ $set: { seen: true } }
		);
		// if nothing is found throw error
		if (!userTrophy) throw new Error("Trophy not found");
		// return the trophy found
		return await Trophies.findById(userTrophy.trophy).lean();
	} catch (error) {
		return;
	}
};
