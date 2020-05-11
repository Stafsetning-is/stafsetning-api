import { Request, Response } from "express";
import { Trophies } from "../../../../../models";

/**
 * Creates a new trophy
 */
export default async (req: Request, res: Response) => {
	try {
		const doc = await Trophies.create(req.body);
		res.status(201).send(doc);
	} catch (error) {
		res.status(400).send(error);
	}
};
