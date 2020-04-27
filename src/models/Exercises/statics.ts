import {
	ExerciseCollectionInterface,
	ExerciseRepr,
	FinishedExerciseRepr,
	AdminExerciseRepr,
	ExerciseInterface,
} from "./interface";
import { Types } from "mongoose";
import { Practices } from "../";
import { PART_SPLITTER } from "./utils";
import { Exercises } from ".";

/**
 * Gets all exercises that fits an users
 * difficulty level
 * @param level the difficulty level
 */
export const getExercisesByDifficulty = async function (
	this: ExerciseCollectionInterface,
	level: number
): Promise<ExerciseRepr[]> {
	const found = await this.find({
		"difficultRange.min": { $lte: level },
		"difficultRange.max": { $gte: level },
		published: true,
		removed: false,
	});
	return found.map((exercise) => exercise.getRepresentation());
};

/**
 * Static method that creates an exercise
 * @param data admin exercise interace
 */
export const create = async function (
	this: ExerciseCollectionInterface,
	data: AdminExerciseRepr
): Promise<ExerciseInterface> {
	const exercise = new this(data);
	exercise.text = data.parts.join(PART_SPLITTER);
	return await exercise.save();
};

/**
 * Static method that updates an exercise
 * @param data admin exercise interace
 */

export const updateFile = async function (
	this: ExerciseCollectionInterface,
	data: AdminExerciseRepr
): Promise<ExerciseInterface> {
	return await Exercises.findByIdAndUpdate(
		data._id,
		{
			$set: {
				fileName: data.fileName,
				text: data.parts.join(PART_SPLITTER),
				published: false,
				difficultRange: data.difficultRange,
			},
		},
		{
			new: true,
		}
	);
};

/**
 * takes in an user id and gets all finished exercised with the
 * highest score for each
 * @param uid User id
 * @param removePracticeRefereence should practice's _id be removed from object;
 */
export const getCompletedExercises = async function (
	uid: Types.ObjectId,
	removePracticeReference?: boolean
): Promise<FinishedExerciseRepr[]> {
	// dict to insert practices by _id to sort by uniquieness of exercise
	const exerciseDict: { [key: string]: FinishedExerciseRepr } = {};

	// finds all practices for user
	const practices = await Practices.find({
		user: uid,
	}).populate("exercise");

	// maps practices to exercise representation with score
	const exercises = practices.map((practice) => {
		const exercise = practice.toExercise();
		if (removePracticeReference) exercise.practice = undefined;
		return exercise;
	});

	// filter by unique exercise Id - keeps the highest score only
	exercises.forEach((doc) => {
		const key = doc._id.toString();
		if (!exerciseDict[key]) exerciseDict[key] = doc;
		if (doc.score > exerciseDict[key].score) exerciseDict[key] = doc;
	});

	// maps dict to array
	return Object.keys(exerciseDict).map((key) => exerciseDict[key]);
};
