import Avatar from "./ImageGenerator/src";
import { UserInterface } from "../../models";
import { uploadFile } from "../";

/**
 * IMPORTANT NOTICE
 *
 * the ImageGenerator package is an open source package
 * with Apache licence. The coding rules present in the
 * image generator code base are different from ours. So
 * linters and code reviews must ignore this package.
 */

// the methods allowed on Avatar class
type GenderBasedMethods = "male8bit" | "female8bit";

/**
 * generates an unique image for a unique value presented
 * to function as key. Caller of function can decide
 * if the image should be male or female
 * @param uniqueKey the key to generate image for
 * @param method which method (male or female) to call
 */
const makeIcon = async (
	uniqueKey: string,
	method: GenderBasedMethods
): Promise<string> => {
	// calls avatar library to get image buffer
	const buffer = await Avatar.builder(
		Avatar.Image.grid(Avatar.Image[method](), 1, 1),
		256,
		256
	).create(uniqueKey);
	// returns uploaded file name from amazon
	return await uploadFile(`${method.charAt(0)}-${uniqueKey}`, buffer);
};

/**
 * Takes in an user interface and returns an male, and female
 * image urls for avatars
 * @param user intereface
 */
export const getImageURLbyUser = async ({ _id }: UserInterface) => {
	const [male, female] = await Promise.all([
		makeIcon(_id.toString(), "male8bit"),
		makeIcon(_id.toString(), "female8bit"),
	]);
	return { male, female };
};
