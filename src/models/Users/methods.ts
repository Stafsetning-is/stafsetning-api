import jwt from "jsonwebtoken";
import { USER_PW_HASH_KEY } from "../../util/secrets";
/**
 * Generates an auth token for a certain user
 */
export const generateAuthToken = async function() {
	const token = jwt.sign({ _id: this._id.toString() }, USER_PW_HASH_KEY);
	this.tokens = this.tokens.concat({ token });
	await this.save();
	return token;
};
