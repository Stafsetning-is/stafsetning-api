import { FinishedExerciseRepr, ExerciseRepr } from "../../../../../models";

export type FinishedExercise = FinishedExerciseRepr | ExerciseRepr;
export type ExerciseReprDict = {
	[key: string]: FinishedExercise;
};
