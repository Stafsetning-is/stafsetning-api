import { ExerciseInterface, UserInterface } from "../../models";
import { Document } from "mongoose";
export interface PracticeInterface extends Document {
	user: UserInterface;
	exercise: ExerciseInterface;
	errors: ErrorInfo[];
	score: number;
	exerciseText: string;
	duration: number;
}

export interface ErrorInfo {
	charAt: number;
	typed: string;
}
