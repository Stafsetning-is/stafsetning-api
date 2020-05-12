import { Exercises } from "../../../../models";
import { Request, Response } from "express";
import { Cache } from "../../../../services";
import { CACHE_KEY, DOCUMENT_COUNT, CACHE_TTL_SEC } from "./utils";

/**
 * Returns an sample of exerecises
 * to display for guests that are not logged in
 */
export default async (_req: Request, res: Response) => {
	try {
		// check cache
		const data = await Cache.get(CACHE_KEY);
		res.send(data);
		return;
	} catch (error) {
		// lookup in db
		const docs = await Exercises.find({
			published: true,
			removed: false,
		}).limit(DOCUMENT_COUNT);
		const repr = docs.map((doc) => doc.getRepresentation());
		Cache.put(CACHE_KEY, repr, CACHE_TTL_SEC);
		res.send(repr);
	}
};
