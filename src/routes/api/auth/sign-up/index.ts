import { FireBaseService } from "../../../utils";
import { Request, Response } from "express";

export default async (req: Request, res: Response) => {
    try {
        const response = await FireBaseService.signUp(req.body)
		res.send(response);
	} catch (error) {
		res.status(400).send(error);
	}
};
