import { Request, Response } from "express";
import { SavedExercises } from "../../../../../models";
/**
 * This method deletes an saved exercise
 */
export default async (req: Request, res: Response) => {
	try {
		const { id } = req.params;
		await SavedExercises.deleteSave(req.body.user._id, id);
		res.status(201).send({
			message: "Deletion was successful",
		});
	} catch (error) {
		res.status(400).send({ message: error.message });
	}
};
