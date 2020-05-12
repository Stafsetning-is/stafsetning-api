import { Exercises } from "../../../../../models";
import { Request, Response } from "express";

/**
 * Get completed exercises by user
 */
export default async (req: Request, res: Response) => {
	try {
		const docs = await Exercises.getCompletedExercises(req.body.user._id);
		res.send(docs);
	} catch (error) {
		console.log("error", error);
		res.status(400).send(error);
	}
};
