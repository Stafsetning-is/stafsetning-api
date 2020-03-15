import { Request, Response, NextFunction } from "express";
import { FireBaseService } from "../";

export const auth = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.header("Authorization").replace("Bearer ", "");
        console.log("token", token);
        req.body.user = await FireBaseService.getUserFromToken(token);
    } catch (error) {
        console.log("error", error);
        console.log("Aunauthorized");
        res.status(401).send("Not authorized");
    } finally {
        next();
    }
};