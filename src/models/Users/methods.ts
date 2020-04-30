import jwt from "jsonwebtoken";
import { USER_PW_HASH_KEY } from "../../util/secrets";
import { PublicUser, UserInterface, MinimizedUser } from "./interface";
import bcrypt from "bcryptjs";
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
export const getPublic = function (this: UserInterface): PublicUser {
	return {
		_id: this._id,
		name: this.name,
		difficulty: this.difficulty,
		type: this.type,
		username: this.username,
		points: this.points ? this.points : 10,
	};
};

export const getMinimized = function (this: UserInterface): MinimizedUser {
	return { username: this.username, _id: this._id.toString() };
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

export const hashString = async function async(
	this: UserInterface,
	text: string
) {
	return await bcrypt.hash(text, 8);
};
