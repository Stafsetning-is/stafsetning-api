export type Token = string;
import { UserInterface } from "../../../models";

export interface AuthResponse {
    token: Token;
    user: UserInterface
}

export interface SignupData {
    mobile: string;
    name: string;
}