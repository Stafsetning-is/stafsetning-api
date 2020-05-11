import { Exercises } from "../../../../../models";
import { Request, Response } from "express";
import { Cache } from "../../../../../services";
import { CACHE_TTL_SEC, getCacheKey } from "./utils";

export default async ({ params: { id } }: Request, res: Response) => {
	const cacheKey = getCacheKey(id);
	console.log("cacheKey", cacheKey);
	Cache.get(cacheKey)
		.then((data) => {
			res.send(data);
		})
		.catch(async () => {
			try {
				const doc = await Exercises.findById(id);
				Cache.put(cacheKey, doc.getRepresentation(), CACHE_TTL_SEC);
				res.status(200).send(doc.getRepresentation());
			} catch (error) {
				res.status(404).send(error);
			}
		});
};
