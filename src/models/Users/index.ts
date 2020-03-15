import { model, Schema } from "mongoose";
import {UserInterface} from "./interface";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";


const userSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        minlength: 5
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minlength: 6
    },
    mobile: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: (value: string) => 
               value.length === 7
            ,
            msg: "Invalid user type"
          }
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }],
    type: {
        type: "String",
        validate: {
            validator: (value: string) => 
               ["user", "admin"].includes(value)
            ,
            msg: "Invalid user type"
          }
    }
});

userSchema.pre<UserInterface>("save", function() {
    this.mobile = this.mobile.replace(/[- ]/g, "");
});

export const Users = model("users", userSchema, "users");
