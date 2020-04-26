import { Request, Response } from "express";
import { getRandomProverb } from "../util";
import { Practices } from "../../../../../models";

export default async ({ params: { id } }: Request, res: Response) => {
    try {
        const practice = await Practices.findById(id);
        res.status(200).send(getRandomProverb(practice.errorItems.length));
    } catch (error) {
        res.status(404).send(error);
    }
};