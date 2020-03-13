import { Exercises } from "../../../../../models"
import { Request, Response } from "express";


export default async (req: Request, res: Response) => {
    try {
        const doc = await Exercises.create(req.body);
        res.send(doc);
    } catch (error) {
        res.status(400).send(error)
    }
}