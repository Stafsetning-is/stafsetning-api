import { Request, Response } from "express";
import { SavedExercises } from "../../../../../models";
/**
 * This method finds user by id and updates difficulty
 */
export default async (req: Request, res: Response) => {
	try {
		const { id } = req.params;
		const doc = await SavedExercises.createNew(req.body.user._id, id);
		res.send(doc);
	} catch (error) {
		res.status(400).send({ message: error.message });
	}
};
