import {
	SavedExercisesInterface,
	StringOrObjectId,
	SavedExercisesCollectionInterface,
} from "./interface";
import { SavedExercises } from "../";

// helper function to verify objectId
const verifyObjectId = (objectId: StringOrObjectId) => {
	if (!objectId.toString().match(/^[0-9a-fA-F]{24}$/))
		throw Error(`${objectId} is not valid`);
};

/**
 * creates savedExercise document
 * @param this is just ta type decleration for this, has no outside effect
 * @param user the user wishing to save
 * @param exercise exercise to save for user
 */
export const createNew = async function (
	this: SavedExercisesCollectionInterface,
	user: StringOrObjectId,
	exercise: StringOrObjectId
): Promise<SavedExercisesInterface> {
	// verifies inputs
	[user, exercise].forEach((input) => verifyObjectId(input));

	try {
		return await SavedExercises.create({ user, exercise });
	} catch (error) {
		throw new Error("Can't save this exercise twice for same user");
	}
};

/**
 * deletes and saved exercise
 * @param this is just ta type decleration for this, has no outside effect
 * @param user the user wishing to unsave
 * @param exercise exercise to unsave for user
 */
export const deleteSave = async function (
	this: SavedExercisesCollectionInterface,
	user: StringOrObjectId,
	exercise: StringOrObjectId
) {
	// verifies inputs
	[user, exercise].forEach((input) => verifyObjectId(input));

	try {
		const doc = await SavedExercises.findOneAndDelete({ user, exercise });
		if (!doc) throw Error();
	} catch (error) {
		throw new Error("Can't find saved exercise");
	}
};
