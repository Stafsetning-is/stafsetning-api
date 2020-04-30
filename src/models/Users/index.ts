import { model, Schema } from "mongoose";
import { UserInterface, UserCollectionInterface } from "./interface";
import * as methods from "./methods";
import * as statics from "./statics";
import { USER_TYPES, UserType, USER_TYPE_USER } from "./utils";
import { UserScoreCards } from "../";

const userSchema = new Schema({
	name: {
		type: String,
		required: true,
		trim: true,
		minlength: 5,
	},
	password: {
		type: String,
		required: true,
		trim: true,
		minlength: 6,
	},
	username: {
		type: String,
		required: true,
		unique: true,
		minlength: 5,
	},
	mobile: {
		type: String,
		required: true,
		unique: true,
		validate: {
			validator: (value: string) => value.length === 7,
			msg: "Invalid user type",
		},
	},
	tokens: [
		{
			token: {
				type: String,
				required: true,
			},
		},
	],
	type: {
		type: String,
		validate: {
			validator: (value: UserType) => USER_TYPES.includes(value),
			msg: "Invalid user type",
		},
		default: USER_TYPE_USER,
	},
	difficulty: {
		type: Number,
		required: true,
	},
	points: {
		type: Number,
		default: 10,
	},
});

// Hashes password when it's modified
userSchema.pre<UserInterface>("save", async function (next) {
	this.mobile = this.mobile.replace(/[- ]/g, "");
	if (this.isModified("password"))
		this.password = await this.hashString(this.password);
	next();
});

// auto converts all new instances to type "user"
userSchema.pre<UserInterface>("save", async function (next) {
	if (this.isNew) this.type = USER_TYPE_USER;
	next();
});

// Validates min and max difficulty
userSchema.pre<UserInterface>("save", async function (next) {
	if (this.difficulty < 1) throw new Error("Difficulty must be higher than 0");
	else if (this.difficulty > 11)
		throw new Error("Difficulty must be lower than 12");
	next();
});

userSchema.post<UserInterface>("init", async function (doc) {
	try {
		await UserScoreCards.create({ user: doc._id });
	} catch (error) {
		// error creating scoreCard
	}
});

userSchema.statics = statics;
userSchema.methods = methods;

export const Users = model<UserInterface, UserCollectionInterface>(
	"users",
	userSchema,
	"users"
);

export * from "./interface";
export * from "./utils";
