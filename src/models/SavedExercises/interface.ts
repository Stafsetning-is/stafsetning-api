import { Types, Document, Model } from "mongoose";
import { ExerciseInterface } from "../Exercises";

export type StringOrObjectId = string | Types.ObjectId;

export interface SavedExercisesInterface extends Document {
	user: Types.ObjectId;
	exercise: ExerciseInterface;
}

export interface SavedExercisesCollectionInterface
	extends Model<SavedExercisesInterface> {
	createNew: (
		user: StringOrObjectId,
		exercise: StringOrObjectId
	) => Promise<SavedExercisesInterface>;
	deleteSave: (
		user: StringOrObjectId,
		exercise: StringOrObjectId
	) => Promise<void>;
	getExercisesSavedByUser: (
		user: StringOrObjectId
	) => Promise<SavedExercisesInterface>;
}
