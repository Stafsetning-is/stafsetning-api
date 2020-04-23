import { Types, Document } from "mongoose";

export interface SavedExercisesInterface extends Document {
	user: Types.ObjectId;
	exercise: Types.ObjectId;
}
