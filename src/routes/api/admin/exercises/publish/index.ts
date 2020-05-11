import { Request, Response } from "express";
import { Exercises } from "../../../../../models";

/**
 * This route publishes an exercise for an admin
 */
export default async (req: Request, res: Response) => {
	const { id } = req.params;
	try {
		const doc = await Exercises.findByIdAndUpdate(
			id,
			{
				$set: {
					published: true,
				},
			},
			{ new: true }
		);
		res.send(doc.getAdminRepresentation());
	} catch (error) {
		res.status(400).send({
			message: "Unable to publish exercise",
		});
	}
};
