import jwt from "jsonwebtoken";
import { USER_PW_HASH_KEY } from "../../util/secrets";
import { PublicUser, UserInterface } from "./interface";
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
export const getPublic = function (): PublicUser {
	return {
		_id: this._id,
		name: this.name,
		difficulty: this.difficulty,
		type: this.type,
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
	console.log("this.type", this.type);
	await this.save();
	return this.getPublic();
};
