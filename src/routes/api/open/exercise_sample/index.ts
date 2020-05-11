import { Exercises } from "../../../../models";
import { Request, Response } from "express";
import { Cache } from "../../../../services";
import { CACHE_KEY, DOCUMENT_COUNT, CACHE_TTL_SEC } from "./utils";

export default async (_req: Request, res: Response) => {
	try {
		const data = await Cache.get(CACHE_KEY);
		res.send(data);
		return;
	} catch (error) {
		const docs = await Exercises.find({
			published: true,
			removed: false,
		}).limit(DOCUMENT_COUNT);
		Cache.put(CACHE_KEY, docs, CACHE_TTL_SEC);
		res.send(docs.map((doc) => doc.getRepresentation()));
	}
};
