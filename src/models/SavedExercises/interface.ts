import { Types } from "mongoose";

export interface SavedExercisesInterface {
	user: Types.ObjectId;
	exercise: Types.ObjectId;
}
