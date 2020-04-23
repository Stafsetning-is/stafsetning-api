import { Request, Response } from "express";
import fs from "fs";
import util from "util";

export default async (req: Request, res: Response) => {
    try {
        const readFile = await util.promisify(fs.readFile);
        const doc = readFile("~/txtfiles/proverbs.txt")
        .then((buf) => {
            res.status(200).send(buf);
        });
    } catch (error) {
        res.status(404).send(error);
    }
};