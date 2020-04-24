import { Exercises } from "../../../../../models";
import { Request, Response } from "express";

export default async (req: Request, res: Response) => {
	try {
		const docs = await Exercises.getCompletedExercises(req.body.user._id);
		res.send(docs);
	} catch (error) {
		res.status(400).send(error);
	}
};
