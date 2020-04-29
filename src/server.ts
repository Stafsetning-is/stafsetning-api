import app from "./app";
import http from "http";
import socketio from "socket.io";
import { socket } from "./services";
const server = http.createServer(app);
const io = socketio(server);

socket.setSocket(io);

/**
 * Start Express server.
 */
server.listen(app.get("port"), () => {
	console.log(
		"  App is running at http://localhost:%d in %s mode",
		app.get("port"),
		app.get("env")
	);
	console.log("  Press CTRL-C to stop\n");
});

export default app;
