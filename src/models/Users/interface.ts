import { Document, Model, Types } from "mongoose";
import { UserType, GenderType } from "./utils";
import { UserPreferencesInterface } from "../";

interface UserBase {
	difficulty: number;
	name: string;
	type: UserType;
	username: string;
	points: number;
	gender?: GenderType;
	avatars: {
		male: string;
		female: string;
	};
}

export interface AuthData {
	token: string;
	user: PublicUser;
}

export interface PublicUser extends UserBase {
	_id: Types.ObjectId;
	preferences: UserPreferencesInterface;
	avatar: string;
}

export interface MinimizedUser {
	username: string;
	_id: string;
	avatar: string;
}

export interface DecodedToken {
	_id: string;
}

export interface UserInterface extends Document, UserBase {
	mobile: string;
	password: string;
	generateAuthToken: () => Promise<string>;
	getPublic: () => Promise<PublicUser>;
	makeAdmin: () => Promise<void>;
	requestAdminPriveledges: () => Promise<PublicUser>;
	hashString: (text: string) => Promise<string>;
	getMinimized: () => MinimizedUser;
	getAvatar: () => string;
	getPoints: () => number;
}

export interface UserCollectionInterface extends Model<UserInterface> {
	findByCredentials: (
		username: string,
		password: string
	) => Promise<AuthData>;
	register: (data: any) => Promise<AuthData>;
	findByToken: (token: string) => Promise<UserInterface>;
	POINTS_PER_EXERCISE: number;
}
