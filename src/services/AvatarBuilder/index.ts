import Avatar from "./ImageGenerator/lib";
import { UserInterface } from "../../models";
import { uploadFile } from "../";

type GenderBasedMethods = "male8bit" | "female8bit";

const makeIcon = async (
	uniqueKey: string,
	method: GenderBasedMethods
): Promise<string> => {
	const buffer = await Avatar.builder(
		Avatar.Image.grid(Avatar.Image[method](), 1, 1),
		256,
		256
	).create(uniqueKey);
	return await uploadFile(`${method.charAt(0)}-${uniqueKey}`, buffer);
};

export const getImageURLbyUser = async ({ _id }: UserInterface) => {
	const [male, female] = await Promise.all([
		makeIcon(_id.toString(), "male8bit"),
		makeIcon(_id.toString(), "female8bit"),
	]);

	return { male, female };
};
