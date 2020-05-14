import { Request } from "express";

export interface AuthRequest extends Request {
	body: ReqBody;
}
// any to allow any key value pair in body
interface ReqBody {
	user: {
		_id: string;
	};
	[otherKeys: string]: any;
}
