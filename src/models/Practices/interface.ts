import { ExerciseInterface, UserInterface } from "../";
import { Document, Types } from "mongoose";
import { FinishedExerciseRepr } from "../Exercises";

export interface PracticeInterface extends Document {
    user: UserInterface;
    exercise: ExerciseInterface;
    errorItems: ErrorInfo[];
    score: number;
    exerciseText: string;
    duration: number;
    toExercise: () => FinishedExerciseRepr;
    getScore: () => number;
}

export interface ErrorInfo {
    charAt: number;
    typed: string;
}
