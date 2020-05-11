import { Practices, Exercises } from "../../../../../models";
import { Request, Response } from "express";

export default async ({ params: { id } }: Request, res: Response) => {
	try {
		const practice = await Practices.findById(id).lean();
		const exercise = await Exercises.findById(practice.exercise);
		res.status(200).send({
			...practice,
			exercise: exercise.getRepresentation(),
		});
	} catch (error) {
		res.status(404).send(error);
	}
};
