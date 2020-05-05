import { MinimizedUser } from "../../models";

export type IncomingEvents = "log-in" | "finish-exercise";

export type OutgoingEvents = "change-points";

export interface ConnectedUser {
	user: MinimizedUser;
	lastActive: number;
}

export interface UserData {
	_id: string;
	data: any;
}

export type ConnectedUsersMap = { [key: string]: ConnectedUser };

export type UsersInExercises = { [key: string]: ConnectedUsersMap };

export interface StartExercise {
	exercise: string;
	_id: string;
}
