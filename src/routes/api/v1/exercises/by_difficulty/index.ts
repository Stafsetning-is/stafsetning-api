import { Exercises } from "../../../../../models"
import { Request, Response } from "express";


export default async (req: Request, res: Response) => {
    // can be removed LATER
    req.body.user = { difficulty: 7 };
    const {difficulty} = req.body.user
    try {
        const docs = await Exercises.getExercisesByDifficulty(difficulty);
        // const docs = await Exercises.find();
        res.send(docs);
    } catch (error) {
        console.log('error', error)
        res.status(400).send(error)
    }
}