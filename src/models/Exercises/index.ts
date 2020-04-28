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
		number: {
			type: Number,
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

// sets one-to-many relationship between the two
exerciseSchema.index({ fileName: 1, owner: 1 }, { unique: true });

// adds incrementing counter
exerciseSchema.post<ExerciseInterface>("save", async function () {
	this.number = await Exercises.countDocuments();
});

// sets default values to properties
exerciseSchema.pre<ExerciseInterface>("save", async function () {
	if (this.isNew) {
		this.removed = false;
		this.published = false;
		this.counter = 0;
	}
});

export * from "./interface";
