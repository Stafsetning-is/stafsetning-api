import { Request, Response } from "express";
import { UserPreferences } from "../../../../../models";

/**
 * edits user's preference
 *
 */
export default async (req: Request, res: Response) => {
	try {
		const { _id } = req.body.user;
		delete req.body.user;
		const doc = await UserPreferences.findOneAndUpdate(
			{ user: _id },
			{
				$set: {
					...req.body,
				},
			},
			{ new: true, runValidators: true }
		);
		res.status(200).send(doc);
	} catch (error) {
		res.status(400).send({ message: error.message });
	}
};
