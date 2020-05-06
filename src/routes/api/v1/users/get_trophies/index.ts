import { Request, Response } from "express";
import { UserTrophies } from "../../../../../models";

/**
 * Returns the trophies this user has
 */
export default async (req: Request, res: Response) => {
	try {
		const userTrophies = await UserTrophies.find({
			user: req.body.user._id,
		}).populate("trophy");
		res.send(userTrophies.map((item) => item.trophy));
	} catch (error) {
		res.status(400).send(error);
	}
};
