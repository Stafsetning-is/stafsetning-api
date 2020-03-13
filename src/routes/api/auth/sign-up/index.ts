import { FireBaseService } from "../../../utils";
import { Request, Response } from "express";

/**
 * Route for sign up
 */
export default async (req: Request, res: Response) => {
	try {
		const response = await FireBaseService.signUp(req.body);
		res.send(response);
	} catch (error) {
		console.log("error", error);
		res.status(400).send(error);
	}
};
