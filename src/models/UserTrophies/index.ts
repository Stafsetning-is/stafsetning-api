import { model, Schema } from "mongoose";
import { UserTrophiesInterface, UserTrophiesCollection } from "./interface";
import * as statics from "./statics";

const userTrophiesSchema = new Schema(
	{
		user: {
			type: Schema.Types.ObjectId,
			required: true,
			ref: "users",
		},
		trophy: {
			type: Schema.Types.ObjectId,
			required: true,
			ref: "trophies",
		},
		seen: {
			type: Boolean,
			default: false,
		},
	},
	{ timestamps: true }
);

userTrophiesSchema.statics = statics;

// sets one-to-many relationship between the two
userTrophiesSchema.index({ user: 1, trophy: 1 }, { unique: true });

export const UserTrophies = model<
	UserTrophiesInterface,
	UserTrophiesCollection
>("usertrophies", userTrophiesSchema, "usertrophies");

export * from "./interface";
