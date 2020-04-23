import {
	ExerciseCollectionInterface,
	ExerciseRepr,
	ExerciseInterface,
	FinishedExerciseRepr,
} from "./interface";
import { Types } from "mongoose";
import { Practices } from "../";

/**
 * Gets all exercises that fits an users
 * difficulty level
 * @param level the difficulty level
 */
export const getExercisesByDifficulty = async function (
	level: number
): Promise<ExerciseRepr[]> {
	// eslint-disable-next-line @typescript-eslint/no-this-alias
	const Exercises: ExerciseCollectionInterface = this;
	const found = await Exercises.find({
		"difficultRange.min": { $lte: level },
		"difficultRange.max": { $gte: level },
	});
	return found.map((exercise) => exercise.getRepresentation());
};

/**
 * takes in an user id and gets all finished exercised with the
 * highest score for each
 * @param uid User id
 */

export const getCompletedExercises = async function (
	uid: Types.ObjectId
): Promise<FinishedExerciseRepr[]> {
	// dict to insert practices by _id to sort by uniquieness of exercise
	const exerciseDict: { [key: string]: FinishedExerciseRepr } = {};

	try {
		// finds all practices for user
		const practices = await Practices.find({
			user: uid,
		}).populate("exercise");
		console.log("practices", practices);
		// maps practices to exercise representation with score
		const exercises = practices.map((doc) => doc.toExercise());

		// filter by unique exercise Id - keeps the highest score only
		exercises.forEach((doc) => {
			const { _id } = doc;
			if (!exerciseDict[_id]) exerciseDict[_id] = doc;
			if (doc.score > exerciseDict[_id].score) exerciseDict[_id] = doc;
		});

		// maps dict to array
		return Object.keys(exerciseDict).map((key) => exerciseDict[key]);
	} catch (error) {
		throw new Error("Failure to get completed exercises by user id");
	}
};
