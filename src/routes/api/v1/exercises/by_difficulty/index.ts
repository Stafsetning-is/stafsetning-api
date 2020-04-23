import { Exercises } from "../../../../../models";
import { Request, Response } from "express";
import { ExerciseReprDict } from "./interface";
export default async (req: Request, res: Response) => {
	try {
		const { difficulty, _id } = req.body.user;
		const [all, finished] = await Promise.all([
			Exercises.getExercisesByDifficulty(difficulty),
			Exercises.getCompletedExercises(_id, true),
		]);
		const dict = [...all, ...finished].reduce<ExerciseReprDict>(
			(prev, curr) => {
				prev[curr._id.toString()] = curr;
				return prev;
			},
			{}
		);
		const docs = Object.keys(dict)
			.map((key) => dict[key])
			.sort((a, b) => {
				return b._id.getTimestamp().getTime() - a._id.getTimestamp().getTime();
			});
		res.send(docs);
	} catch (error) {
		res.status(400).send(error);
	}
};
