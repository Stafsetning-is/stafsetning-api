import { Server as ServerType, Socket as SocketType } from "socket.io";
import { ConnectedUsersMap, IncomingEvents, UserData } from "./interface";
import { Users, MinimizedUser } from "../../models";
import { SESSION_LENGTH } from "./utils";

class Socket {
	private io: ServerType;
	private static init = false;
	private usersConnected: ConnectedUsersMap;

	private constructor() {
		this.usersConnected = {};
		setInterval(() => this.cleanDisconnected(), SESSION_LENGTH);
	}

	private cleanDisconnected() {
		const timeNow = new Date().getTime();
		for (const key in this.usersConnected) {
			const sessionInfo = this.usersConnected[key];
			if (timeNow - sessionInfo.lastActive > SESSION_LENGTH)
				this.disconnectUser(sessionInfo.user);
			else sessionInfo.lastActive = timeNow;
		}
	}

	private disconnectUser(user: MinimizedUser) {
		this.io.emit("user-log-out", user);
		delete this.usersConnected[user._id];
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
		this.io.on("connect", (socket: SocketType) => {
			this.handleNewConnection(socket);
		});
	}

	private setUserAsRecentlyActive(userId: string) {
		const user = this.usersConnected[userId];
		if (!user) return;
		user.lastActive = new Date().getTime();
	}

	private async handleUserLogin(userId: string) {
		try {
			const user = await Users.findById(userId);
			const publicInfo = user.getMinimized();
			this.usersConnected[userId] = {
				user: publicInfo,
				lastActive: new Date().getTime(),
			};
			const connectedUsers = this.getConnectedUsers();
			this.io.emit("current-users", connectedUsers);
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

	private handleIncoming(event: IncomingEvents, { _id, data }: UserData) {
		(async () => {
			if (!_id) return;
			switch (event) {
				case "log-in":
					await this.handleUserLogin(_id);
					break;
				default:
				// do nothing on default
			}
			this.handleUserActivity(_id);
		})();
	}

	private getConnectedUsers() {
		return Object.keys(this.usersConnected).map(
			(key) => this.usersConnected[key].user
		);
	}

	private handleNewConnection = (socket: SocketType) => {
		this.io.emit("current-users", this.getConnectedUsers());
		socket.on("log-in", (data: UserData) => {
			this.handleIncoming("log-in", data);
		});
	};
}

export const socket = Socket.start();
