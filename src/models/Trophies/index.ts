import { model, Schema } from "mongoose";
import { TrophyInterface, TrophyColllectionInterface } from "./interface";
import * as statics from "./statics";

const trophySchema = new Schema({
	rules: [
		{
			type: Schema.Types.ObjectId,
			ref: "rules",
		},
	],
	title: {
		type: String,
		required: true,
	},
	description: {
		type: String,
		required: true,
	},
	icon: {
		type: String,
		required: true,
	},
});

trophySchema.statics = statics;

export const Trophies = model<TrophyInterface, TrophyColllectionInterface>(
	"trophies",
	trophySchema,
	"trophies"
);

export * from "./interface";
