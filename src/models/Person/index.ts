import { model, Schema, Mongoose } from "mongoose";
import { PersonCollectionInterface, PersonInterface } from "./interface";
import * as statics from "./statics";
import * as methods from "./methods";

const personSchema = new Schema({
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
});

personSchema.statics = statics;
personSchema.methods = methods;

export const Person = model<PersonInterface, PersonCollectionInterface>(
	"person",
	personSchema,
	"person"
);

export * from "./interface";
