import bcrypt from "bcryptjs";
import {
    AuthData,
    UserInterface,
    UserCollectionInterface,
    DecodedToken
} from "./interface";
import * as jwt from "jsonwebtoken";
import { USER_PW_HASH_KEY } from "../../util/secrets";
import { UserScoreCards } from "../";
import { getFinishedExercises } from "../Practices/statics";
import { PracticeCollectionInterface } from "../Practices";
import { finished } from "stream";
/**
 * Takes in auth details and returns the user
 * @param username email of user
 * @param password password of user
 */
export const findByCredentials = async function (
    username: string,
    password: string
): Promise<AuthData> {
    const user: UserInterface = await this.findOne({ username });
    if (!user) throw new Error("Unable to login");
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new Error("Unable to login");
    const token = await user.generateAuthToken();
    return {
        user: await user.getPublic(),
        token: token
    };
};

/**
 * Creates a user and returns the public data with token
 * @param data he user data
 */
export const register = async function (data: {}): Promise<AuthData> {
    const user: UserInterface = await this.create(data);
    const token = await user.generateAuthToken();
    return {
        user: await user.getPublic(),
        token
    };
};

/**
 * Takes in a token and finds the user belingong to that token
 * this static also logs the user authentication
 * to user score card
 * @param token possible users token
 */
export const findByToken = async function (
    this: UserCollectionInterface,
    token: string
) {
    const decoded = jwt.verify(token, USER_PW_HASH_KEY);
    if (typeof decoded === "string") throw Error("Invalid token");
    const user = await this.findById((decoded as DecodedToken)._id);
    if (!user) throw new Error("User not found");
    UserScoreCards.logActivity(user._id);
    return user;
};

export const getAnalytics = async function () {
    const anal = { finishedCount: 0 };
    //anal.finishedCount = await getFinishedExercises();
    return anal;
};

// default number of points gained per exercise
export const POINTS_PER_EXERCISE = 10;
