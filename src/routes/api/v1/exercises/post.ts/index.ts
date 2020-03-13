import { Exercises } from "../../../../../models"
import { Request, Response } from "express";


export default async (req: Request, res: Response) => {
    try {
        const doc = await Exercises.create(req.body);
        res.status(201).send(doc);
    } catch (error) {
        console.log('error', error)
        res.status(400).send(error)
    }
}