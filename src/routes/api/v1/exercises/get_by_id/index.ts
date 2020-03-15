import { Exercises } from "../../../../../models";
import { Request, Response } from "express";


export default async ({params: {id}}: Request, res: Response) => {
    try {
        const doc = await Exercises.findById(id);
        res.status(200).send(doc.getRepresentation());
    } catch (error) {
        console.log("error", error);
        res.status(404).send(error);
    }
};