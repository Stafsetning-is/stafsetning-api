import { Request } from "express";

export interface AuthRequest extends Request {
	body: ReqBody;
}

interface ReqBody {
	user: {
		_id: string;
	};
	[otherKeys: string]: any;
}
