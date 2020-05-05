import { Request, Response } from "express";
import { SavedExercises } from "../../../../../models";

export default async (req: Request, res: Response) => {
    try {
        res.send(await SavedExercises.getExercisesSavedByUser(req.body.user));
    } catch (error) {
        res.status(400).send(error);
    }
};
