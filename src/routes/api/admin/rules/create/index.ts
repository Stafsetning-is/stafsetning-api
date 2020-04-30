import { Request, Response } from "express";
import { Rules } from "../../../../../models";

/**
 * Creates a new rule
 */
export default async (req: Request, res: Response) => {
	try {
		const doc = await Rules.create({
			owner: req.body.user._id,
			...req.body,
		});
		res.send(doc);
	} catch (error) {
		res.status(400).send(error);
	}
};
