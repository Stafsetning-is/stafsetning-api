import { MinimizedUser } from "../../models";

export type IncomingEvents =
	| "log-in"
	| "start-exercise"
	| "leave-exercise"
	| "log-out"
	| "complete-exercise";

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
