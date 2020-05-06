import { model, Schema, Types } from "mongoose";
import { COMPARISON } from "./utils";
import { RuleInterface, RuleCollectionInterface } from "./interface";
import * as statics from "./statics";

const ruleSchema = new Schema({
	accessor: {
		type: String,
		required: true,
	},
	comparison: {
		type: String,
		required: true,
		validate: {
			validator: (value: any) => COMPARISON.includes(value),
			msg: "Comparison is invalid",
		},
	},
	value: {
		type: Number,
		required: true,
	},
	owner: {
		type: Types.ObjectId,
		required: true,
		ref: "users",
	},
});

ruleSchema.statics = statics;

export const Rules = model<RuleInterface, RuleCollectionInterface>(
	"rules",
	ruleSchema,
	"rules"
);

export * from "./interface";
