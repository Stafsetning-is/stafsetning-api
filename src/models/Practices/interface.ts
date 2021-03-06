import { ExerciseInterface } from "../";
import { Document } from "mongoose";
import { FinishedExerciseRepr } from "../Exercises";

export interface PracticeInterface extends Document {
	user: string;
	exercise: ExerciseInterface;
	errorItems: ErrorInfo[];
	score: number;
	exerciseText: string;
	duration: number;
	toExercise: () => FinishedExerciseRepr;
	getScore: () => number;
	createdAt: Date;
}

export interface ErrorInfo {
	charAt: number;
	typed: string;
}
