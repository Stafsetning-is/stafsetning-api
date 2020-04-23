import { Request, Response } from "express";
import { Users } from "../../../../../models";
/**
 * This method finds user by id and updates difficulty
 */
export default async (req: Request, res: Response) => {
	try {
		const { id } = req.params;
	} catch (error) {
		res.status(400).send({ message: error.message });
	}
};
