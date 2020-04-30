import { UserTrophiesCollection } from "./interface";
import { Trophies } from "../";

export const handOutTrophyToUser = async function (
	this: UserTrophiesCollection,
	userId: string
) {
	try {
		const userTrophy = await this.findOne({ user: userId, seen: false });
		if (!userTrophy) throw new Error("Trophy not found");
		return await Trophies.findByIdAndUpdate(userTrophy.trophy, {
			$set: { seen: true },
		}).lean();
	} catch (error) {
		// no trophy found
	}
};
