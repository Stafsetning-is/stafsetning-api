import { Server as ServerType, Socket as SocketType } from "socket.io";
import {
	ConnectedUsersMap,
	IncomingEvents,
	UserData,
	ConnectedUser,
} from "./interface";
import { Users, MinimizedUser, UserTrophies } from "../../models";
import {
	SESSION_LENGTH,
	EVENTS,
	LOG_IN,
	FINISH_EXERCISE,
	CURRENT_USERS,
	CONNECT,
	UPDATE_POINTS,
	TROPHY_EMIT_TIMEOUT_MS,
	NEW_TROPHY,
} from "./utils";

class Socket {
	private io: ServerType;
	private static init = false;
	private usersConnected: ConnectedUsersMap;

	private constructor() {
		this.usersConnected = {};
		setInterval(() => this.cleanDisconnected(), SESSION_LENGTH);
	}

	private getConnectedUsers() {
		return Object.keys(this.usersConnected).map(
			(key) => this.usersConnected[key].user
		);
	}

	private handleNewConnection = (socket: SocketType) => {
		this.io.emit(CURRENT_USERS, this.getConnectedUsers());
		EVENTS.forEach((event) => {
			socket.on(event, (data) => this.handleIncoming(event, data, socket));
		});
	};

	private cleanDisconnected() {
		this.cleanConnectedUsersMap(this.usersConnected);
	}

	private cleanConnectedUsersMap(map: ConnectedUsersMap) {
		const timeNow = new Date().getTime();
		for (const key in map) {
			const sessionInfo = map[key];
			if (timeNow - sessionInfo.lastActive > SESSION_LENGTH) delete map[key];
			else sessionInfo.lastActive = timeNow;
		}
	}

	public static start() {
		if (Socket.init) return;
		const instance = new Socket();
		Socket.init = true;
		return instance;
	}

	public setSocket(socket: ServerType) {
		this.io = socket;
		this.listenSocket();
	}

	private listenSocket() {
		this.io.on(CONNECT, (socket: SocketType) => {
			this.handleNewConnection(socket);
		});
	}

	private setUserAsRecentlyActive(userId: string) {
		const user = this.usersConnected[userId];
		if (!user) return;
		user.lastActive = new Date().getTime();
	}

	private getSessionInfo(user: MinimizedUser): ConnectedUser {
		return {
			user,
			lastActive: new Date().getTime(),
		};
	}

	private async getUserSessionInfoById(userId: string) {
		const user = await Users.findById(userId);
		return this.getSessionInfo(user.getMinimized());
	}

	private async handleUserLogin(userId: string) {
		try {
			this.usersConnected[userId] = await this.getUserSessionInfoById(userId);
			const connectedUsers = this.getConnectedUsers();
			this.io.emit(CURRENT_USERS, connectedUsers);
		} catch (error) {
			// error in lookup
		}
	}

	private async handleUserActivity(userId: string) {
		if (!userId) return;
		if (this.usersConnected[userId]) {
			this.setUserAsRecentlyActive(userId);
			return;
		}
		await this.handleUserLogin(userId);
	}

	private async handleFinishExercise(userId: string, socket: SocketType) {
		const user = await Users.findByIdAndUpdate(
			userId,
			{
				$inc: { points: Users.POINTS_PER_EXERCISE },
			},
			{ new: true }
		);
		socket.emit(UPDATE_POINTS, user.points);
		setTimeout(async () => {
			const trophy = await UserTrophies.handOutTrophyToUser(userId);
			if (trophy) socket.emit(NEW_TROPHY, trophy);
		}, TROPHY_EMIT_TIMEOUT_MS);
	}

	private async handleIncoming(
		event: IncomingEvents,
		data: UserData,
		socket: SocketType
	) {
		try {
			switch (event) {
				case LOG_IN:
					await this.handleUserLogin(data._id);
					break;
				case FINISH_EXERCISE:
					await this.handleFinishExercise(data._id, socket);
			}
			this.handleUserActivity(data._id);
		} catch (error) {
			console.log(error);
		}
	}
}

export const socket = Socket.start();
