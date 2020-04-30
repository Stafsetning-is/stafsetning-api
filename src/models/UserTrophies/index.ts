import { model, Schema } from "mongoose";
import { UserTrophiesInterface } from "./interface";

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

// sets one-to-many relationship between the two
userTrophiesSchema.index({ user: 1, exercise: 1 }, { unique: true });

export const UserTrophies = model<UserTrophiesInterface>(
	"usertrophies",
	userTrophiesSchema,
	"usertrophies"
);

export * from "./interface";
