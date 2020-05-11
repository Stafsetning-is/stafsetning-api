import {
	PublicUser,
	ExerciseRepr,
	SavedExercises,
} from "../../../../../models";
import { Exercises } from "../../../../../models";
import { ExerciseReprDict } from "./interface";

type AwaitAllRes = [ExerciseRepr[], ExerciseRepr[], ExerciseRepr[]];
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
	/**
	 * Await necessary data lookups
	 * in parallel by promise all
	 */
	const [all, finished, saved]: AwaitAllRes = await Promise.all([
		Exercises.getExercisesByDifficulty(difficulty),
		Exercises.getCompletedExercises(_id, true),
		SavedExercises.getExercisesSavedByUser(_id),
	]);

	// maps to dict to make sure no duplicate _ids
	const dict = [...all, ...finished].reduce<ExerciseReprDict>(
		(prev, curr) => {
			const key = curr._id.toString();
			prev[key] = curr;
			prev[key].saved = false;
			return prev;
		},
		{}
	);

	// marks saved if they're fund in savedexercise collection
	saved.forEach(({ _id }) => {
		const key = _id.toString();
		if (dict[key]) dict[key].saved = true;
	});

	// returns objects
	return Object.keys(dict)
		.map((key) => dict[key])
		.sort((a, b) => {
			return (
				b._id.getTimestamp().getTime() - a._id.getTimestamp().getTime()
			);
		});
};
