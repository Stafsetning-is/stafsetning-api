import { Request, Response } from "express";
import { getExercisesForUser } from "./utils";

/**
 * get exercises by difficulty
 */
export default async (req: Request, res: Response) => {
	try {
		const docs = await getExercisesForUser(req.body.user);
		res.send(docs);
	} catch (error) {
		res.status(400).send(error);
	}
};
