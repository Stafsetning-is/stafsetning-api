import { Document, Model, Types } from "mongoose";
import { UserType } from "./utils";

interface UserBase {
	difficulty: number;
	name: string;
	type: UserType;
	username: string;
	points: number;
}

export interface AuthData {
	token: string;
	user: PublicUser;
}

export interface PublicUser extends UserBase {
	_id: Types.ObjectId;
}

export interface MinimizedUser {
	username: string;
	_id: string;
}

export interface DecodedToken {
	_id: string;
}

export interface UserInterface extends Document, UserBase {
	mobile: string;
	password: string;
	generateAuthToken: () => Promise<string>;
	getPublic: () => PublicUser;
	makeAdmin: () => Promise<void>;
	requestAdminPriveledges: () => Promise<PublicUser>;
	hashString: (text: string) => Promise<string>;
	getMinimized: () => MinimizedUser;
}

export interface UserCollectionInterface extends Model<UserInterface> {
	findByCredentials: (username: string, password: string) => Promise<AuthData>;
	register: (data: any) => Promise<AuthData>;
	findByToken: (token: string) => Promise<UserInterface>;
	POINTS_PER_EXERCISE: number;
}
