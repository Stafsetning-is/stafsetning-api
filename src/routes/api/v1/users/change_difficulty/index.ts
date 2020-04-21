import { Request, Response } from "express";

export default async (req: Request, res: Response) => {
    try {
        res.send(req.body.user);
    } catch (error) {
        res.status(400).send(error);
    }
};
