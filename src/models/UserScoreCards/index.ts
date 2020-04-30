import { model, Schema } from "mongoose";
import { UserScoreCardInterface, UserScoreCardCollection } from ".";
import * as statics from "./statics";

const userScoreCardSchema = new Schema({
	loginStreak: {
		type: Number,
		default: 1,
	},
	lastLoggedIn: {
		type: Date,
		default: new Date(),
	},
	created: {
		type: Date,
		default: new Date(),
	},
	user: {
		type: Schema.Types.ObjectId,
		ref: "users",
		unique: true,
	},
});

userScoreCardSchema.statics = statics;

export const UserScoreCards = model<
	UserScoreCardInterface,
	UserScoreCardCollection
>("userscorecard", userScoreCardSchema, "userscorecard");

export * from "./interface";
