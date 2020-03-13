import { FireBaseService } from "../../../utils";
import { Request, Response } from "express";

/**
 * Route for log in
 */
export default async (req: Request, res: Response) => {
    try {
		let { phoneNumber } = req.body;
		if (!phoneNumber.includes("+354")) {
			phoneNumber = "+354" + phoneNumber;
		}
        const response = await FireBaseService.logIn(phoneNumber);
		res.send(response);
	} catch (error) {
		res.status(400).send(error);
	}
};
