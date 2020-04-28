import { Request, Response } from "express";
import { Users } from "../../../../../../models";

/**
 * This method finds user by id, validates and changes password
 */
export default async (req: Request, res: Response) => {
    try {
        if (req.body.difficulty === undefined)
            throw new Error("Difficulty missing in request body");
        const user = await Users.findById(req.body.user._id);
        // user.password = req.body.password;
        // await user.save();
        res.send(user.getPublic());
    } catch (error) {
        res.status(400).send({ message: error.message });
    }
};
