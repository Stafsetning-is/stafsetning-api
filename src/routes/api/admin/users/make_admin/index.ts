import { Request, Response } from "express";
import { Users } from "../../../../../models";
/**
 * sets the user as an admin in the system
 */
export default async (req: Request, res: Response) => {
	const { uid } = req.params;
	try {
		if (!uid) throw new Error("User Id not found");
		const user = await Users.findById(uid);
		if (!user) throw new Error("User was not found");
		await user.makeAdmin();
		res.send();
	} catch (error) {
		res.status(400).send(error);
	}
};
