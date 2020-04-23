import { model, Schema } from "mongoose";
import { ExerciseCollectionInterface, ExerciseInterface } from "./interface";
import * as statics from "./statics";
import * as methods from "./methods";

const exerciseSchema = new Schema(
	{
		user: {
			type: { min: Number, max: Number },
			required: true,
		},
		exercise: {
			type: Number,
		},
	},
	{ timestamps: true }
);

exerciseSchema.statics = statics;
exerciseSchema.methods = methods;
exerciseSchema.post<ExerciseInterface>("save", async function () {
	// eslint-disable-next-line @typescript-eslint/no-use-before-define
	this.number = await Exercises.countDocuments();
});

export const Exercises = model<ExerciseInterface, ExerciseCollectionInterface>(
	"exercises",
	exerciseSchema,
	"exercises"
);

export * from "./interface";
