import { FinishedExerciseRepr, PracticeInterface } from "../";

export const toExercise = function (
	this: PracticeInterface
): FinishedExerciseRepr {
	return {
		...this.exercise.getRepresentation(),
		completed: true,
		score: this.getScore(),
		practice: this._id,
	};
};

export const getScore = function (this: PracticeInterface) {
	const DEDUCTION = 0.05;
	const score = 1 - this.errorItems.length * DEDUCTION;
	return score < 0 ? 0 : score;
};
