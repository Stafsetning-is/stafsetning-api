import { Request, Response } from "express";
import { SavedExercises } from "../../../../../models";

export default async (req: Request, res: Response) => {
	try {
		// const exercises = await SavedExercises.getExercisesSavedByUser(req.body.user._id);
		// res.send(exercises);
		res.send("hello");
	} catch (error) {
		res.status(400).send(error);
	}
};
