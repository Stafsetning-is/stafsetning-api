import { model, Schema, Mongoose, HookNextFunction, Collection } from "mongoose";
import { ExerciseCollectionInterface, ExerciseInterface } from "./interface";
import * as statics from "./statics";
import * as methods from "./methods";

const exerciseSchema = new Schema(
	{
		difficultRange: {
			type: [Number],
			required: [true, "Æfing verður að hafa erfiðleikastig"],
			validate: {
				validator: function(value: number[]) {
					if (value.length !== 2) return false;
					const [min, max] = value;
					return min <= max;
				},
				msg: "Hámarks og lágmarks erfiðleikastig ekki rétt"
			}
		},
		number: {
			type: Number,
		}
	},
	{ timestamps: true }
);

exerciseSchema.statics	 = statics;
exerciseSchema.methods = methods;
exerciseSchema.post("save", async function() {
	this.number = await Collection.countDocuments();
});

export const Exercises = model<ExerciseInterface, ExerciseCollectionInterface>(
	"exercises",
	exerciseSchema,
	"exercises"
);



export * from "./interface";
