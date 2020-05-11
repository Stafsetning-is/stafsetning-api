import { Exercises } from "../../../../../models";
import { Request, Response } from "express";
import { Cache } from "../../../../../services";
import { CACHE_TTL_SEC, getCacheKey } from "./utils";

/**
 * Returns an exercise by id
 */
export default async ({ params: { id } }: Request, res: Response) => {
	// get cache key
	const cacheKey = getCacheKey(id);
	// check cache
	Cache.get(cacheKey)
		.then((data) => {
			// res.send cached data
			res.send(data);
		})
		.catch(async () => {
			// if no cache, lookup in db
			try {
				const doc = await Exercises.findById(id);
				Cache.put(cacheKey, doc.getRepresentation(), CACHE_TTL_SEC);
				res.status(200).send(doc.getRepresentation());
			} catch (error) {
				res.status(404).send(error);
			}
		});
};
