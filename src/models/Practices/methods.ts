import { FinishedExerciseRepr, PracticeInterface } from "../";

export const toExercise = function (
	this: PracticeInterface
): FinishedExerciseRepr {
	return {
		...this.exercise.getRepresentation(),
		completed: true,
		score: this.score,
	};
};
