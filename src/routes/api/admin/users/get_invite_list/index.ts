import { Request, Response } from "express";
import { Users, USER_TYPE_PENDING_ADMIN_INVITE } from "../../../../../models";
/**
 * sets the user as an admin in the system
 */
export default async (req: Request, res: Response) => {
	try {
		const users = await Users.find({ type: USER_TYPE_PENDING_ADMIN_INVITE });
		res.send(users.map((user) => user.getPublic()));
	} catch (error) {
		res.status(400).send(error);
	}
};
