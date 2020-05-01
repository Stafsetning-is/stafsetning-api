import { UserTrophiesCollection } from "./interface";
import { Trophies } from "../";

export const handOutTrophyToUser = async function (
	this: UserTrophiesCollection,
	userId: string
) {
	try {
		const userTrophy = await this.findOneAndUpdate(
			{ user: userId, seen: false },
			{ $set: { seen: true } }
		);
		if (!userTrophy) throw new Error("Trophy not found");
		return await Trophies.findById(userTrophy.trophy).lean();
	} catch (error) {
		// no trophy found
	}
};
