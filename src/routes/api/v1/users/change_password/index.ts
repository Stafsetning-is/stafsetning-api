import { Request, Response } from "express";
import { Users } from "../../../../../models";

/**
 * This method finds user by id, validates and changes password
 */
export default async (req: Request, res: Response) => {
	const { password, newPassword, user } = req.body;
	try {
		if (!(password && newPassword))
			throw new Error("password missing in request body");

		const [_authData, found] = await Promise.all([
			Users.findByCredentials(user.username, password),
			Users.findById(user._id),
		]);

		found.password = newPassword;
		await found.save();
		res.send({ message: "password successfully changed" });
	} catch (error) {
		res.status(400).send({ message: error.message });
	}
};
