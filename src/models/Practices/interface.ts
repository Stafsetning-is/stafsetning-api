import { ExerciseInterface, UserInterface } from "../";
import { Document } from "mongoose";
export interface PracticeInterface extends Document {
	user: UserInterface;
	exercise: ExerciseInterface;
	errorInput: ErrorInfo[];
	score: number;
	exerciseText: string;
	duration: number;
}

export interface ErrorInfo {
	charAt: number;
	typed: string;
}
