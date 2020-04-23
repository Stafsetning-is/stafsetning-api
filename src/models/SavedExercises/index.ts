import { model, Schema } from "mongoose";
import {
	SavedExercisesInterface,
	SavedExercisesCollectionInterface,
} from "./interface";
import * as statics from "./statics";

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

savedExercisesSchema.statics = statics;

// sets one-to-many relationship between the two
savedExercisesSchema.index({ user: 1, exercise: 1 }, { unique: true });

export const SavedExercises = model<
	SavedExercisesInterface,
	SavedExercisesCollectionInterface
>("savedexercises", savedExercisesSchema, "savedexercises");

export * from "./interface";
