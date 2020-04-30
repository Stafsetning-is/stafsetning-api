import { Request, Response } from "express";
import { UserTrophies } from "../../../../../models";

/**
 * Returns the trophies this user has
 */
export default async (req: Request, res: Response) => {
	try {
		res.send(req.body.user);
	} catch (error) {
		res.status(400).send(error);
	}
};
