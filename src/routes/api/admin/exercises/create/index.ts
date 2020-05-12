import { Request, Response } from "express";
import { Exercises } from "../../../../../models";

/**
 * This route saves exercises for an admin
 */
export default async (req: Request, res: Response) => {
	try {
		const doc = await Exercises.create({
			...req.body,
			owner: req.body.user._id,
		});
		res.status(201).send(doc.getAdminRepresentation());
	} catch (error) {
		res.status(400).send({
			message: "Unable to save exercise",
		});
	}
};
