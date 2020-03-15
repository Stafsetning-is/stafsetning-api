import { Document, Model } from "mongoose";

export interface PublicUser {
	difficulty: number;
	name: string;

}

export interface UserInterface extends Document, PublicUser {
	mobile: string;
	password: string;
	generateAuthToken: () => Promise<string>;
}

export interface UserCollectionInterface extends Model<UserInterface> {
	findByCredentials: (username: string, password: string) => Promise<UserInterface>;
}