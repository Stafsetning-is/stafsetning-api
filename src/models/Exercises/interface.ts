import { Document, Model, Types } from "mongoose";
import { Report } from "./utils/GrammarRules/interface";
interface Base {
	difficultRange: {
		min: number;
		max: number;
	};
	completed?: boolean;
	owner: Types.ObjectId;
}

export interface ExerciseInterface extends Base, Document {
	text: string;
	published: boolean;
	removed: boolean;
	fileName: string;
	counter: number;
	getRepresentation: () => ExerciseRepr;
	getAdminRepresentation: () => AdminExerciseRepr;
	getText: () => string;
	getTextParts: () => string[];
	getWordCount: () => number;
	getGrammarReport: () => Report;
	getTitle: () => string;
	getCharacterCount: () => number;
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
	saved?: boolean;
	counter: number;
}

export interface AdminExerciseRepr extends Base {
	parts: string[];
	fileName: string;
	title: string;
	_id: Types.ObjectId;
	published: boolean;
	counter: number;
}

export interface FinishedExerciseRepr extends ExerciseRepr {
	score: number;
	practice?: Types.ObjectId;
}

export interface ExerciseCollectionInterface extends Model<ExerciseInterface> {
	getExercisesByDifficulty: (level: number) => Promise<ExerciseRepr[]>;
	getCompletedExercises: (
		uid: Types.ObjectId,
		removeRef?: boolean
	) => Promise<FinishedExerciseRepr[]>;
	updateFile: (data: any) => Promise<ExerciseInterface>;
	findByIdAndIncrementCounter: (id: any) => Promise<ExerciseInterface>;
}
