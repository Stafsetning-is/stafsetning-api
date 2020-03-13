import { FireBaseService } from "../../../utils";
import { Request, Response } from "express";

export default async (req: Request, res: Response) => {
    try {
        const { username, password } = req.body;
        const response = await FireBaseService.logIn(username, password)
		res.send(response);
	} catch (error) {
		res.status(400).send(error);
	}
};
