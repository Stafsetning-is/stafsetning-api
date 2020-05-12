import { model, Schema } from "mongoose";
import { ExerciseCollectionInterface, ExerciseInterface } from "./interface";
import * as statics from "./statics";
import * as methods from "./methods";

const exerciseSchema = new Schema(
	{
		difficultRange: {
			type: { min: Number, max: Number },
			required: true,
		},
		text: {
			type: String,
			required: true,
		},
		practice: { type: Schema.Types.ObjectId },
		completed: { type: Boolean },
		published: {
			default: false,
			type: Boolean,
		},
		removed: {
			default: false,
			type: Boolean,
		},
		fileName: {
			required: true,
			type: String,
		},
		owner: {
			type: Schema.Types.ObjectId,
			ref: "users",
			required: true,
		},
		counter: {
			type: Number,
			default: 0,
		},
	},
	{ timestamps: true }
);

exerciseSchema.statics = statics;
exerciseSchema.methods = methods;

export const Exercises = model<ExerciseInterface, ExerciseCollectionInterface>(
	"exercises",
	exerciseSchema,
	"exercises"
);

export * from "./interface";
