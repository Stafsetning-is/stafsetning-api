import {
	UserPreferencesCollection,
	UserPreferencesInterface,
} from "./interface";
import { Types } from "mongoose";

export const getPreferencesByUser = async function (
	this: UserPreferencesCollection,
	userId: Types.ObjectId
): Promise<UserPreferencesInterface> {
	let preferences: UserPreferencesInterface;
	preferences = await this.findOne({ user: userId });
	if (!preferences) preferences = await this.create({ user: userId });
	return preferences;
};
