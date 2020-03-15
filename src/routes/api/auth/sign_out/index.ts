import { FireBaseService } from "../../../utils";
import { Request, Response } from "express";

/**
 * Route for sign out
 */
export default async (_req: Request, res: Response) => {
    try {
        const response = await FireBaseService.signOut();
		res.send(response);
	} catch (error) {
		res.status(400).send(error);
	}
};