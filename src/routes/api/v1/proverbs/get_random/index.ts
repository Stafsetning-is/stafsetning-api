import { Request, Response } from "express";
import fs from "fs";
import util from "util";

export default async (req: Request, res: Response) => {
    try {
        res.status(200).send("hallo");
        // const readFile = await util.promisify(fs.readFile);
        // const doc = readFile("~/txtfiles/proverbs.txt")
        // .then((buf) => {
        //     res.status(200).send(buf.toJSON());
        // });
    } catch (error) {
        res.status(404).send(error);
    }
};