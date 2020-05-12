import { Practices, Exercises } from "../../../../../models";
import { Request, Response } from "express";

/**
 * Gets an practice by id
 * and returns the practice in form of an exercise
 */
export default async ({ params: { id } }: Request, res: Response) => {
	try {
		console.log("hi");
		const practice = await Practices.findById(id).lean();
		console.log("practice", practice);
		const exercise = await Exercises.findById(practice.exercise);
		res.status(200).send({
			...practice,
			exercise: exercise.getRepresentation(),
		});
	} catch (error) {
		res.status(404).send(error);
	}
};
