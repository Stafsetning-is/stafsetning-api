import { FireBaseService } from "../../../utils";
import { Request, Response } from "express";

/**
 * Route for log in
 */
export default async (req: Request, res: Response) => {
    try {
		const { phoneNumber } = req.body;
        const response = await FireBaseService.logIn(phoneNumber);
		res.send(response);
	} catch (error) {
		res.status(400).send(error);
	}
};
