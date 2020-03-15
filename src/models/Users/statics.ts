import bcrypt from "bcryptjs";
import { AuthData, UserInterface } from "./interface";
/**
 * Takes in auth details and returns the user
 * @param username email of user
 * @param password password of user
 */
export const findByCredentials = async function(
	username: string,
	password: string
): Promise<AuthData> {
	const user: UserInterface = await this.findOne({ username });
	if (!user) throw new Error("Unable to login");
	const isMatch = await bcrypt.compare(password, user.password);
	if (!isMatch) throw new Error("Unable to login");
	const token = await user.generateAuthToken();
	return {
		user: user.getPublic(),
		token: token
	};
};

/**
 * Creates a user and returns the public data with token
 * @param data he user data
 */
export const register = async function(data: {}): Promise<AuthData> {
	const user: UserInterface = await this.create(data);
	const token = await user.generateAuthToken();
	return {
		user: user.getPublic(),
		token
	};
};