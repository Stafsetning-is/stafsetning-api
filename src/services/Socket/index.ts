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

/**
 * Class that handles socket communications
 */
class Socket {
	private io: ServerType;
	private static init = false;
	private usersConnected: ConnectedUsersMap;

	private constructor() {
		this.usersConnected = {};
		setInterval(() => this.cleanDisconnected(), SESSION_LENGTH);
	}

	/**
	 * returns an array of users that are connected
	 * to the application in real time
	 */
	private getConnectedUsers() {
		return Object.keys(this.usersConnected).map(
			(key) => this.usersConnected[key].user
		);
	}

	/**
	 * Handlles new connection and adds
	 * event listeners
	 */
	private handleNewConnection = (socket: SocketType) => {
		// emits connection of user to all connections
		this.io.emit(CURRENT_USERS, this.getConnectedUsers());
		// addes event listeners for al eveents
		EVENTS.forEach((event) => {
			socket.on(event, (data) =>
				this.handleIncoming(event, data, socket)
			);
		});
	};

	// clean disconnected users
	private cleanDisconnected() {
		this.cleanConnectedUsersMap(this.usersConnected);
	}

	/**
	 * find users in map that have not been
	 * active long enough and removes them
	 */
	private cleanConnectedUsersMap(map: ConnectedUsersMap) {
		const timeNow = new Date().getTime();
		for (const key in map) {
			const sessionInfo = map[key];
			if (timeNow - sessionInfo.lastActive > SESSION_LENGTH)
				delete map[key];
			else sessionInfo.lastActive = timeNow;
		}
	}

	/**
	 * Starts the socket class
	 */
	public static start() {
		if (Socket.init) return;
		const instance = new Socket();
		Socket.init = true;
		return instance;
	}

	/**
	 * connects the socket
	 */
	public setSocket(socket: ServerType) {
		this.io = socket;
		this.listenSocket();
	}

	/**
	 * listens to new connections
	 * and handles them
	 */
	private listenSocket() {
		this.io.on(CONNECT, (socket: SocketType) => {
			this.handleNewConnection(socket);
		});
	}

	/**
	 * takes in an usere Id and sets
	 * it as reecently active
	 * @param userId users id
	 */
	private setUserAsRecentlyActive(userId: string) {
		const user = this.usersConnected[userId];
		if (!user) return;
		user.lastActive = new Date().getTime();
	}

	/**
	 * returns an ConnectedUser interface for user
	 * @param user minimized user interface
	 */
	private getSessionInfo(user: MinimizedUser): ConnectedUser {
		return {
			user,
			lastActive: new Date().getTime(),
		};
	}

	/**
	 * looks up user in db and returns ConnectedUser
	 * @param userId users id
	 */
	private async getUserSessionInfoById(userId: string) {
		const user = await Users.findById(userId);
		return this.getSessionInfo(user.getMinimized());
	}

	/**
	 * handles that a user has lgoged in
	 * @param userId users id
	 */
	private async handleUserLogin(userId: string) {
		try {
			this.usersConnected[userId] = await this.getUserSessionInfoById(
				userId
			);
			const connectedUsers = this.getConnectedUsers();
			this.io.emit(CURRENT_USERS, connectedUsers);
		} catch (error) {
			// error in lookup
		}
	}

	/**
	 * handles the fact that
	 * a usere has been recent active
	 * @param userId users id
	 */
	private async handleUserActivity(userId: string) {
		if (!userId) return;
		if (this.usersConnected[userId]) {
			this.setUserAsRecentlyActive(userId);
			return;
		}
		await this.handleUserLogin(userId);
	}

	/**
	 * when user finishes exercise
	 * then we update points and emit it to app
	 *
	 * we also check for trophies and emit
	 * them on a time out
	 * @param userId
	 * @param socket
	 */
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

	/**
	 * handles incoming event
	 * through an specific socket
	 * @param event event type
	 * @param data user data
	 * @param socket the socket
	 */
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
			// do nothing on error
		}
	}
}

export const socket = Socket.start();
