import { Response } from "express";
import { Users } from "../../../../../models";
import { Request } from "./interface";
/**
 * sets the gender for the user sending the request
 *
 */
export default async (req: Request, res: Response) => {
	try {
		const {
			user: { _id },
			gender,
		} = req.body;
		const doc = await Users.findByIdAndUpdate(
			_id,
			{
				$set: {
					gender,
				},
			},
			{ new: true, runValidators: true }
		);
		res.status(200).send(await doc.getPublic());
	} catch (error) {
		res.status(400).send({ message: error.message });
	}
};
