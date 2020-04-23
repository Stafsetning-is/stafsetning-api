import { Types, Document, Model } from "mongoose";

type StringOrObjectId = string | Types.ObjectId;

export interface SavedExercisesInterface extends Document {
	user: Types.ObjectId;
	exercise: Types.ObjectId;
}

export interface SavedExercisesCollectionInterface
	extends Model<SavedExercisesInterface> {
	createNew: (
		user: StringOrObjectId,
		exercise: StringOrObjectId
	) => Promise<SavedExercisesInterface>;
}
