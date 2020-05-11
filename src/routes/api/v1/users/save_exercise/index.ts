import { Request, Response } from "express";
import { SavedExercises } from "../../../../../models";

/**
 * This method creates an saved exericse
 *
 */
export default async (req: Request, res: Response) => {
	try {
		const { id } = req.params;
		const doc = await SavedExercises.createNew(req.body.user._id, id);
		res.status(201).send(doc);
	} catch (error) {
		res.status(400).send({ message: error.message });
	}
};
