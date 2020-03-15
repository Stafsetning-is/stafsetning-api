import { Document, Model, Types } from "mongoose";

interface UserBase {
	difficulty: number;
	name: string;

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
}

export interface UserCollectionInterface extends Model<UserInterface> {
	findByCredentials: (username: string, password: string) => Promise<UserInterface>;
	register: (data: any) => Promise<PublicUser>;
}