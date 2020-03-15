import { Exercises } from "../../../../../models";
import { Request, Response } from "express";

export default async (req: Request, res: Response) => {
    
    try {
        const { difficulty } = req.body.user;
        const docs = await Exercises.getExercisesByDifficulty(difficulty);
        res.send(docs);
    } catch (error) {
        res.status(400).send(error);
    }
};