import { Request, Response, NextFunction } from "express";
import * as jwt from "jsonwebtoken";
import { USER_PW_HASH_KEY } from "../../../../../util/secrets";
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
		const token = req.header("Authorization").replace("Bearer ", "");
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		const decoded: any = jwt.verify(token, USER_PW_HASH_KEY);
		console.log("decoded", decoded);
		const user = await Users.findOne({
			_id: decoded._id,
		});
		if (!user) throw new Error("User not found");
		if (!req.body) req.body = {};
		req.body.user = user.getPublic();
		next();
	} catch (e) {
		console.log(req.method);
		console.log("e", e);
		res.status(401).send("Not authorized");
	}
};
