import { Document, Model, Types } from "mongoose";
interface Base {
	difficultRange: {
		min: number;
		max: number;
	};
	number: number;
	completed?: boolean;
}

export interface ExerciseInterface extends Base, Document {
	text: string;
	getRepresentation: () => ExerciseRepr;
}

export interface ExerciseRepr extends Base {
	length: number;
	parts: string[];
	title: string;
	_id: Types.ObjectId;
	wordCount: number;
	report: {
		[key: string]: {
			count: number;
			name: string;
		};
	};
}

export interface FinishedExerciseRepr extends ExerciseRepr {
	score: number;
	practice: Types.ObjectId;
}

export interface ExerciseCollectionInterface extends Model<ExerciseInterface> {
	getExercisesByDifficulty: (level: number) => Promise<ExerciseRepr[]>;
	getCompletedExercises: (uid: string) => Promise<FinishedExerciseRepr[]>;
}
