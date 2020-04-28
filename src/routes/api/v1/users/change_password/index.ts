import { Request, Response } from "express";
import { Users } from "../../../../../models";

/**
 * This method finds user by id, validates and changes password
 */
export default async (req: Request, res: Response) => {
    try {
        if (
            req.body.password === undefined ||
            req.body.newPassword === undefined ||
            req.body.password === null
        )
            throw new Error("password missing in request body");
        const user = await Users.findById(req.body.user._id);
        if (user.password === req.body.password) {
            user.password = req.body.newPassword;
            await user.save();
            res.send("password successfully changed");
        }
        console.log(user.password);
        throw new Error("wrong password");
    } catch (error) {
        res.status(400).send({ message: error.message });
    }
};
