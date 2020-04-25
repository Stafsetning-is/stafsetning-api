import { Request, Response } from "express";

export default async (req: Request, res: Response) => {
	try {
		res.send("hallo");
	} catch (error) {}
};
