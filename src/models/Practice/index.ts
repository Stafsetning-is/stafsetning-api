import { model, Schema } from "mongoose";
import { PracticeInterface } from "./interface";

const practiceSchema = new Schema(
	{
		user: {
			type: String,
			required: true
		},
        exercise: {
            type: Schema.Types.ObjectId,
            ref: "exercises",
            required: true
        },
		errors: {
			type: [{ charAt: Number, typed: String }],
			default: []
		},
		score: {
			type: Number,
            min: 0,
            max: 1,
            required: true
		},
		exerciseText: {
            type: String,
            required: true
		},
		duration: {
            type: Number,
            required: true
		}
	},
	{ timestamps: true }
);

export const Practices = model<PracticeInterface>(
	"practices",
	practiceSchema,
	"practices"
);

// export * from "./interface";
