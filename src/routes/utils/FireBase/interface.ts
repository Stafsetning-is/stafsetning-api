export type Token = string;
import { UserInterface } from "../../../models";

export interface AuthResponse {
    token: Token;
    user: UserInterface;
}

export interface SignupData {
    mobile: string;
    name: string;
    userName: string;
    password1: string;
    password2: string;
    
}