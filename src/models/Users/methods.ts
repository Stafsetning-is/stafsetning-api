import jwt from "jsonwebtoken";
import { USER_PW_HASH_KEY } from "../../util/secrets";
import { PublicUser, UserInterface, MinimizedUser, UserPreferences } from "../";
import bcrypt from "bcryptjs";
import { DEFAULT_GENDER } from "./utils";
/**
 * Generates an auth token for a certain user
 */
export const generateAuthToken = async function () {
	const token = jwt.sign({ _id: this._id.toString() }, USER_PW_HASH_KEY);
	this.tokens = this.tokens.concat({ token });
	await this.save();
	return token;
};

/**
 * Get public representation
 * of the user
 */
export const getPublic = async function (
	this: UserInterface
): Promise<PublicUser> {
	return {
		_id: this._id,
		name: this.name,
		difficulty: this.difficulty,
		type: this.type,
		username: this.username,
		gender: this.gender,
		avatars: this.avatars,
		points: this.getPoints(),
		avatar: this.getAvatar(),
		preferences: await UserPreferences.getPreferencesByUser(this._id),
	};
};

/**
 * gets a minimized version of user type
 * @param this type decleration for this
 */
export const getMinimized = function (this: UserInterface): MinimizedUser {
	return {
		username: this.username,
		_id: this._id.toString(),
		avatar: this.getAvatar(),
	};
};

/**
 * Changes user to admin type
 */
export const makeAdmin = async function (this: UserInterface) {
	this.type = "admin";
	await this.save();
};

/**
 * set user type to pending-admin-inviite
 */
export const requestAdminPriveledges = async function (this: UserInterface) {
	this.type = "pending-admin-invite";
	await this.save();
	return this.getPublic();
};

/**
 * returns a promise of a hashed string
 *
 * @param this type decleration for this
 * @param text text to hash
 */
export const hashString = async function (this: UserInterface, text: string) {
	return await bcrypt.hash(text, 8);
};

/**
 * returns an avatar based on user gender settings
 * @param this type decleration for this
 */
export const getAvatar = function (this: UserInterface) {
	if (!this.gender) return this.avatars[DEFAULT_GENDER];
	return this.avatars[this.gender];
};

/**
 * returns points for user
 * @param this type decleration for this
 */
export const getPoints = function (this: UserInterface) {
	return this.points ? this.points : 10;
};
