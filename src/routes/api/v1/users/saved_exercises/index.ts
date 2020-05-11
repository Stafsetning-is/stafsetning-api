import { Request, Response } from "express";
import { SavedExercises } from "../../../../../models";

/**
 * Gets all saved exerecises for an usere
 */
export default async (req: Request, res: Response) => {
	try {
		res.send(
			await SavedExercises.getExercisesSavedByUser(req.body.user._id)
		);
	} catch (error) {
		res.status(400).send(error);
	}
};
