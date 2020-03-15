import { Exercises } from "../../../../models";
import { Request, Response } from "express";

export default async (req: Request, res: Response) => {
    try {
        const docs = await Exercises.find({}).limit(20);
        res.send(docs.map((doc) => doc.getRepresentation()));
    } catch (error) {
        res.status(400).send(error);
    }
};