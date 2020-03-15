import { Request, Response, NextFunction } from "express";
import * as jwt from "jsonwebtoken";
import {USER_PW_HASH_KEY} from "../../../util/secrets";
import {Users} from "../../../models";

export const auth = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.header("Authorization").replace("Bearer ", "");
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const decoded: any = jwt.verify(token, USER_PW_HASH_KEY);
        const customer = await Users.findOne({ _id: decoded._id, "tokens.token": token });
        if (!customer) throw new Error();
        req.body.customer = customer;
        next();
    } catch (e) {
        res.status(401).send("Not authorized");
    }
};

module.exports = auth;