import { Document, Model } from "mongoose";
export interface UserInterface extends Document {
	difficulty: number;
	name: string;
	mobile: string;
	generateAuthToken: () => Promise<string>;
}

export interface UserCollectionInterface extends Model<UserInterface> {
	findByCredentials: (username: string, password: string) => Promise<UserInterface>;
}