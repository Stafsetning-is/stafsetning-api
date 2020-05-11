import { Request as BaseRequest } from "express";
import { GenderType } from "../../../../../models";

export interface Request extends BaseRequest {
	body: {
		gender: GenderType;
		user: {
			_id: string;
		};
	};
}
