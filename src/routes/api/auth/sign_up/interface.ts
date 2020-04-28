/* eslint-disable @typescript-eslint/no-explicit-any */

import { Request } from "express";
export interface AuthRequest extends Request {
	body: {
		user: {
			_id: string;
		};
		[x: string]: any;
		requestAdmin: boolean;
	};
}
