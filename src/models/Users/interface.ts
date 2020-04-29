import { Document, Model, Types } from "mongoose";
import { UserType } from "./utils";

interface UserBase {
	difficulty: number;
	name: string;
	type: UserType;
	username: string;
}

export interface AuthData {
	token: string;
	user: PublicUser;
}

export interface PublicUser extends UserBase {
	_id: Types.ObjectId;
}

export interface UserInterface extends Document, UserBase {
	mobile: string;
	password: string;
	generateAuthToken: () => Promise<string>;
	getPublic: () => PublicUser;
	makeAdmin: () => Promise<void>;
	requestAdminPriveledges: () => Promise<PublicUser>;
	hashString: (text: string) => Promise<string>;
}

export interface UserCollectionInterface extends Model<UserInterface> {
	findByCredentials: (username: string, password: string) => Promise<AuthData>;
	register: (data: any) => Promise<AuthData>;
}
