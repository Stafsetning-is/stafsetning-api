import { Exercises } from "../../../../models";
import { Request, Response } from "express";

const DOCUMENT_COUNT = 20;

export default async (req: Request, res: Response) => {
	const docs = await Exercises.find({
		published: true,
		removed: false,
	}).limit(DOCUMENT_COUNT);
	res.send(docs.map((doc) => doc.getRepresentation()));
};
