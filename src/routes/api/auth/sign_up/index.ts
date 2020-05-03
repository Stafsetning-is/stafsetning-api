import { Users } from "../../../../models";
import { Response } from "express";
import { AuthRequest } from "./interface";
/**
 * Route for sign up
 */
export default async (req: AuthRequest, res: Response) => {
	try {
		const signupData = await Users.register(req.body);
		if (req.body.requestAdmin) {
			const found = await Users.findById(signupData.user._id);
			const updated = await found.requestAdminPriveledges();
			signupData.user = updated;
		}
		res.status(201).send(signupData);
	} catch (error) {
		console.log("error", error);
		res.status(400).send({ message: "Sign up failed" });
	}
};
