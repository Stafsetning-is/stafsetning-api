import { Practices } from "../../../../../models";
import { Request, Response } from "express";

export default async (req: Request, res: Response) => {
    try {
        const docs = await Practices.find({ user: req.body.user._id }).populate(
            "exercise"
        );
        const exercises = docs.map((doc) => {
            const exercise = doc.exercise;
            exercise.completed = true;
            exercise.practice = doc._id;
            return exercise.getRepresentation();
        });
        res.send(exercises);
    } catch (error) {
        res.status(400).send(error);
    }
};
