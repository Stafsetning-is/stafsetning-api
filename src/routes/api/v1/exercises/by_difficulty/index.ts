import { Exercises } from "../../../../../models"
import { Request, Response } from "express";

export default async (req: Request, res: Response) => {
    
    try {
        const {difficulty} = req.body.user
        const docs = await Exercises.getExercisesByDifficulty(difficulty);
        // const docs = await Exercises.find();
        res.send(docs);
    } catch (error) {
        console.log('error', error)
        res.status(400).send(error)
    }
}