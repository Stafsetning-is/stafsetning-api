import { Request, Response } from "express";
import { Practices } from "../../../../../models";
//import { getFinishedExercises } from "../../../../../models/Practices/statics";

/* *
 * Returns the number of finished exercises this user has
 */
export default async (req: Request, res: Response) => {
    try {
        const finishedExercises = await Practices.getFinishedExercises();
        res.send({ count: finishedExercises });
    } catch (error) {
        res.status(400).send(error);
    }
};
