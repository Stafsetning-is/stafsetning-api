import { PublicUser, ExerciseRepr } from "../../../../../models";
import { Exercises } from "../../../../../models";
import { ExerciseReprDict } from "./interface";

/**
 * Fetches exercises in users diffculty range
 * then it fetches completed exercises by user's id
 * joins them together to make sure
 * that there are no dupliciates of any exercise
 */
export const getExercisesForUser = async ({
	difficulty,
	_id,
}: PublicUser): Promise<ExerciseRepr[]> => {
	const [all, finished] = await Promise.all([
		Exercises.getExercisesByDifficulty(difficulty),
		Exercises.getCompletedExercises(_id, true),
	]);
	const dict = [...all, ...finished].reduce<ExerciseReprDict>((prev, curr) => {
		prev[curr._id.toString()] = curr;
		return prev;
	}, {});
	return Object.keys(dict)
		.map((key) => dict[key])
		.sort((a, b) => {
			return b._id.getTimestamp().getTime() - a._id.getTimestamp().getTime();
		});
};
