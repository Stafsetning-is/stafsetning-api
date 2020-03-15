import { Practices } from "../../../../../models";
import { Request, Response } from "express";


export default async (req: Request, res: Response) => {
    console.log("req.body", req.body);
    try {
        const doc = await Practices.create({
            ...req.body,
            user: req.body.user.id
        });
        res.status(201).send(doc);
    } catch (error) {
        console.log("error", error);
        res.status(400).send(error);
    }
};