import { model, Schema } from "mongoose";
import { SavedExercisesInterface } from "./interface";

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

export const Exercises = model<SavedExercisesInterface>(
	"exercises",
	exerciseSchema,
	"exercises"
);

export * from "./interface";
