import { model, Schema } from "mongoose";
import { SavedExercisesInterface } from "./interface";

const savedExercisesSchema = new Schema(
	{
		user: {
			type: Schema.Types.ObjectId,
			required: true,
			ref: "users",
		},
		exercise: {
			type: Schema.Types.ObjectId,
			required: true,
			ref: "exercises",
		},
	},
	{ timestamps: true }
);

// sets one-to-many relationship between the two
savedExercisesSchema.index({ user: 1, exercise: 1 }, { unique: true });

export const SavedExercises = model<SavedExercisesInterface>(
	"savedexercises",
	savedExercisesSchema,
	"savedexercises"
);

export * from "./interface";
