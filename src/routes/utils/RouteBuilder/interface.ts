import { Request, Response, NextFunction } from "express"

type Route = (req: Request, res: Response, next?: NextFunction) => Promise<void>;

export interface RouterObject {
    route: string;
    controller: Route;
}


export interface EndpointObject extends RouterObject {
    method: "post" | "get",
    middleware?: Route[];
}
