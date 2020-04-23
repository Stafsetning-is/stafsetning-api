import { model, Schema } from "mongoose";
import { PracticeInterface } from "./interface";
import * as methods from "./methods";

const practiceSchema = new Schema(
	{
		user: {
			type: String,
			required: true,
		},
		exercise: {
			type: Schema.Types.ObjectId,
			ref: "exercises",
			required: true,
		},
		errorItems: {
			type: [{ charAt: Number, error: String }],
			default: [],
		},
		score: {
			type: Number,
			min: 0,
			max: 1,
		},
		exerciseString: {
			type: String,
			required: true,
		},
		duration: {
			type: Number,
			required: true,
		},
	},
	{ timestamps: true }
);

practiceSchema.methods = methods;

export const Practices = model<PracticeInterface>(
	"practices",
	practiceSchema,
	"practices"
);

export * from "./interface";
