import { Users } from "../../../../models";
import { Request, Response } from "express";

/**
 * Route for sign up
 */
export default async (req: Request, res: Response) => {
	try {
		const user = await Users.register(req.body);
		res.status(201).send(user);
	} catch (error) {
		console.log("SIGNUP ROOUTE", error);
		res.status(400).send({ message: "Sign up failed" });
	}
};
