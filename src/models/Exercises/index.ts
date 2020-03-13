import { model, Schema, Mongoose } from "mongoose";
import {ExerciseCollectionInterface, ExerciseInterface } from "./interface";
import * as statics from "./statics";
import * as methods from "./methods";

const exerciseSchema = new Schema({
	age: {
		type: Number,
		required: true
	},
	name: {
		type: String,
		required: true
	},
	mother: {
		type: Schema.Types.ObjectId,
		ref: "person",
		required: false
	}
}, { timestamps: true });

exerciseSchema.statics = statics;
exerciseSchema.methods = methods;

export const Person = model<ExerciseInterface, ExerciseCollectionInterface>(
	"exercises",
	exerciseSchema,
	"exercises"
);

export * from "./interface";
