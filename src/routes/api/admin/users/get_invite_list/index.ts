import { Request, Response } from "express";
import { Users, USER_TYPE_PENDING_ADMIN_INVITE } from "../../../../../models";
/**
 * gets list of users pending admin priveledges
 */
export default async (req: Request, res: Response) => {
	const users = await Users.find({ type: USER_TYPE_PENDING_ADMIN_INVITE });
	const promises = users.map((user) => user.getPublic());
	res.send(await Promise.all(promises));
};
