import { Request, Response } from "express";
import { Exercises } from "../../../../../models";
import { AuthRequest } from "../../utils";
/**
 * Queries a single file by file name of the owner
 */
export default async (req: AuthRequest, res: Response) => {
	const { name } = req.query;
	try {
		const { user } = req.body;
		const doc = await Exercises.findOne({
			fileName: name,
			owner: user._id,
		});
		res.send(doc.getAdminRepresentation());
	} catch (error) {
		res.status(404).send({
			message: "File not found",
		});
	}
};
