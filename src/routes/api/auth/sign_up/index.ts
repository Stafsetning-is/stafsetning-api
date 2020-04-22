import { Users } from "../../../../models";
import { Request, Response } from "express";

/**
 * Route for sign up
 */
export default async (req: Request, res: Response) => {
	try {
		console.log("req.body", req.body);
		const user = await Users.register(req.body);
		res.status(201).send(user);
	} catch (error) {
		console.log("SIGNUP ROUTE", error);
		res.status(400).send({ message: "Sign up failed" });
	}
};
