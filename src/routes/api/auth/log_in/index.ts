import { Users } from "../../../../models";
import { Request, Response } from "express";

/**
 * Route for log in
 */
export default async ({body: {username, password}}: Request, res: Response) => {
    try {
		const userData = await Users.findByCredentials(username, password);
		res.send(userData);
	} catch (error) {
		res.status(400).send(error);
	}
};
