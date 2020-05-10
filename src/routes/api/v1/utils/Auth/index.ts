import { Request, Response, NextFunction } from "express";
import { Users } from "../../../../../models";

/**
 * Express middle ware that requires
 * a brearer token to be present
 * in the request. It decodes the token
 * and finds the request sender in the user table
 * and attaches user to req.body
 */
export const auth = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const header = req.header("Authorization");
		if (!header) throw new Error("Authorization header missing");
		if (!header.includes("Bearer")) throw new Error("Bearer token missing");
		const token = header.replace("Bearer ", "");
		const user = await Users.findByToken(token);
		req.body.user = await user.getPublic();
		next();
	} catch (e) {
		res.status(401).send({
			message: e.message,
		});
	}
};
