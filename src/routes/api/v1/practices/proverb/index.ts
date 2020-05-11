import { Request, Response } from "express";
import { getRandomProverb } from "./utils";
import { Practices } from "../../../../../models";

/**
 * gets an proverb for a single practice
 */
export default async ({ params: { id } }: Request, res: Response) => {
	try {
		const practice = await Practices.findById(id);
		res.status(200).send(getRandomProverb(practice.errorItems.length));
	} catch (error) {
		res.status(404).send(error);
	}
};
