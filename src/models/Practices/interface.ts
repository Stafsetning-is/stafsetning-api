import { ExerciseInterface, UserInterface } from "../";
import { Document } from "mongoose";
import { FinishedExerciseRepr } from "../Exercises";

export interface PracticeInterface extends Document {
	user: UserInterface;
	exercise: ExerciseInterface;
	errorInput: ErrorInfo[];
	score: number;
	exerciseText: string;
	duration: number;
	toExercise: () => FinishedExerciseRepr;
}

export interface ErrorInfo {
	charAt: number;
	typed: string;
}
