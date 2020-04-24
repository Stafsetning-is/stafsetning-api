import { model, Schema } from "mongoose";
import { UserInterface, UserCollectionInterface } from "./interface";
import * as methods from "./methods";
import * as statics from "./statics";
import bcrypt from "bcryptjs";

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
            validator: (value: string) => ["user", "admin"].includes(value),
            msg: "Invalid user type",
        },
        default: "user",
    },
    difficulty: {
        type: Number,
        required: true,
    },
});

// Hashesh password when it's modified
userSchema.pre<UserInterface>("save", async function (next) {
    this.mobile = this.mobile.replace(/[- ]/g, "");
    if (this.isModified("password"))
        this.password = await bcrypt.hash(this.password, 8);
    next();
});

// auto converts all new instances to type "user"
userSchema.pre<UserInterface>("save", async function (next) {
    if (this.isNew) this.type = "user";
    next();
});

// Validates min and max difficulty
userSchema.pre<UserInterface>("save", async function (next) {
    if (this.difficulty < 1)
        throw new Error("Difficulty must be higher than 0");
    else if (this.difficulty > 11)
        throw new Error("Difficulty must be lower than 12");
    next();
});

userSchema.statics = statics;
userSchema.methods = methods;

export const Users = model<UserInterface, UserCollectionInterface>(
    "users",
    userSchema,
    "users"
);

export * from "./interface";
