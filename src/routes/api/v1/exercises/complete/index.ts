import { Practices } from "../../../../../models";
import { Request, Response } from "express";

/**
 * Marks an exercise as completed by user
 * by creating an practice
 */
export default async (req: Request, res: Response) => {
	try {
		const doc = await Practices.create({
			...req.body,
			user: req.body.user._id,
		});
		res.status(201).send(doc);
	} catch (error) {
		res.status(400).send(error);
	}
};
