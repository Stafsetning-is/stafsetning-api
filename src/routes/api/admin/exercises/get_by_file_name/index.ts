import { Request, Response } from "express";
import { Exercises } from "../../../../../models";

/**
 * Queries a single file by file name of the owner
 */
export default async (req: Request, res: Response) => {
	try {
		const { user } = req.body;
		const doc = await Exercises.findOne({
			fileName: req.body.fileName,
			owner: user._id,
		});
		res.send(doc.getAdminRepresentation());
	} catch (error) {
		res.status(404).send({
			message: "File not found",
		});
	}
};
