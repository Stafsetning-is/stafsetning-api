import { Practices } from "../../../../../models";
import { Request, Response } from "express";

export default async (req: Request, res: Response) => {
	try {
		const doc = await Practices.create({
			...req.body,
			user: req.body.user._id,
		});
		res.status(201).send(doc);
	} catch (error) {
		console.log("error", error);
		res.status(400).send(error);
	}
};
