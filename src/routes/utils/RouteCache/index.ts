import { Request, Response, NextFunction } from "express";
import { Cache } from "../../../services";
export const checkCache = (cacheKey: string) => async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const data = await Cache.get(cacheKey);
		res.send(data);
	} catch (error) {
		// do nothing on error
	} finally {
		next();
	}
};
