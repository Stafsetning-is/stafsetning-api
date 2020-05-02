import { Request, Response } from "express";
import { Users } from "../../../../../models";
/**
 * This method finds user by id and updates difficulty
 */
export default async (req: Request, res: Response) => {
	const { _id } = req.body.user;
	delete req.body.user;
	try {
		const user = await Users.findByIdAndUpdate(
			_id,
			{
				$set: { difficulty: req.body.difficulty },
			},
			{ new: true }
		);
		res.send(await user.getPublic());
	} catch (error) {
		res.status(400).send({ message: error.message });
	}
};
