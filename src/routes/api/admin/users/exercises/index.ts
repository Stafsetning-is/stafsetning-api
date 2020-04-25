import { Request, Response } from "express";
import { Exercises } from "../../../../../models";

/**
 * Gets all the exercise files for an admin
 */
export default async (req: Request, res: Response) => {
	try {
		const docs = await Exercises.find({
			owner: req.body.user._id,
		});
		res.send(docs.map((doc) => doc.getAdminRepresentation()));
	} catch (error) {
		res.status(400).send(error);
	}
};
