import { Request, Response } from "express";
import { Users } from "../../../../../models";
/**
 * This method finds user by id and updates difficulty
 */
export default async (req: Request, res: Response) => {
    try {
        if (req.body.password === undefined)
            throw new Error("Password missing in request body");
        const user = await Users.findById(req.body.user._id);
        user.password = req.body.password;

        // await user.save();
        res.send(user.password);
    } catch (error) {
        res.status(400).send({ message: error.message });
    }
};
