import { Request, Response } from "express"

export default async (req: Request, res: Response) => {
    res.send({
        sentenceParts: ["Kalli for ut i bud", "ad kaupa fisk", "og tommatsosu"]
    })
}