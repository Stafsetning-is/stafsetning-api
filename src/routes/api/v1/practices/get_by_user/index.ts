import { Practices, Exercises } from "../../../../../models";
import { Request, Response } from "express";

export default async (req: Request, res: Response) => {
    try {
        res.send([]);
    } catch (error) {
        res.status(400).send(error);
    }
};
