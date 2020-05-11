import {
	UserPreferencesCollection,
	UserPreferencesInterface,
} from "./interface";
import { Types } from "mongoose";

/**
 * gets the preference object for
 * the user that has the given id
 * @param this type decleration for context
 * @param userId users id
 */
export const getPreferencesByUser = async function (
	this: UserPreferencesCollection,
	userId: Types.ObjectId
): Promise<UserPreferencesInterface> {
	// declare the preference object as undefined
	let preferences: UserPreferencesInterface;
	// queries for the object
	preferences = await this.findOne({ user: userId });
	// if it is not found, then we create it
	if (!preferences) preferences = await this.create({ user: userId });
	// return the object
	return preferences;
};
