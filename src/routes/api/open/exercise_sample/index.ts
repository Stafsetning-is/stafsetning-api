import { Exercises } from "../../../../models";
import { Request, Response } from "express";

const DOCUMENT_COUNT;

export default async (req: Request, res: Response) => {
	const docs = await Exercises.find({
		published: true,
		deleted: false,
	}).limit(DOCUMENT_COUNT);
	res.send(docs.map((doc) => doc.getRepresentation()));
};
