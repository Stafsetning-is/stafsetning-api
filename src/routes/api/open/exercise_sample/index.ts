import { Exercises } from "../../../../models";
import { Request, Response } from "express";

export default async (req: Request, res: Response) => {
	const docs = await Exercises.find({
		published: true,
		deleted: false,
	}).limit(20);
	res.send(docs.map((doc) => doc.getRepresentation()));
};
