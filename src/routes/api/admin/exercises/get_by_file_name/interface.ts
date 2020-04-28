import { AuthRequest } from "../../utils";

export interface Request extends AuthRequest {
    query: {
        name: string;
    };
}
