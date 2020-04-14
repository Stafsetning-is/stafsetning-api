import { Request, Response, NextFunction } from "express";
import * as jwt from "jsonwebtoken";
import { USER_PW_HASH_KEY } from "../../../util/secrets";
import { Users } from "../../../models";

export const auth = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const token = req.header("Authorization").replace("Bearer ", "");
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		const decoded: any = jwt.verify(token, USER_PW_HASH_KEY);
		const user = await Users.findOne({
			_id: decoded._id,
		});
		if (!user) throw new Error("User not found");
		req.body.user = user.getPublic();
		next();
	} catch (e) {
		res.status(401).send("Not authorized");
	}
};
