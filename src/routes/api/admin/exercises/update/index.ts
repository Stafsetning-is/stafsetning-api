import { Request, Response } from "express";
import { Exercises } from "../../../../../models";

/**
 * This route updates an exercises for an admin
 */
export default async (req: Request, res: Response) => {
	try {
		const doc = await Exercises.updateFile(req.body);
		res.send(doc.getAdminRepresentation());
	} catch (error) {
		res.status(400).send({
			message: "Unable to save exercise",
		});
	}
};
