import express, { Application, Router } from "express";
import rateLimit from "express-rate-limit";
import compression from "compression";
import bodyParser from "body-parser";
import path from "path";
import session from "express-session";
import mongoose from "mongoose";
import mongo from "connect-mongo";
import { MONGODB_URI, SESSION_SECRET } from "./util/secrets";
import cors from "cors";

/**
 * Utils class that sets up
 *     basic express middleware
 *     starts listening to port
 *     connects mongo db
 *     add base endpoints for testing
 */
export default class AppUtils {
	/**
	 * Sets the app up
	 * @param app The Express app
	 */
	public static setup(app: Application) {
		AppUtils.setupMiddleware(app)
			.startListen(app)
			.addTestEndpoints(app)
			.connectMongo();
	}

	/**
	 * Adds basic middleware
	 */
	private static setupMiddleware = (app: Application) => {
		app.use(cors());
		// Mongo middleware to express
		const MongoStore = mongo(session);
		app.use(
			session({
				resave: true,
				saveUninitialized: true,
				secret: SESSION_SECRET,
				store: new MongoStore({
					url: MONGODB_URI,
					autoReconnect: true,
				}),
			})
		);

		// request rate limits from same ip's
		app.use(
			rateLimit({
				windowMs: 15 * 60 * 1000,
				max: 100,
			})
		);

		app.use(compression());
		app.use(bodyParser.json());
		app.use(bodyParser.urlencoded({ extended: true }));

		app.use(
			express.static(path.join(__dirname, "public"), { maxAge: 31557600000 })
		);
		return AppUtils;
	};

	/**
	 * Connects to mongo
	 */
	private static connectMongo = () => {
		// Connect to MongoDB
		mongoose
			.connect(MONGODB_URI, {
				useNewUrlParser: true,
				useCreateIndex: true,
				useUnifiedTopology: true,
			})
			.then(() => {
				console.log("Connected to MongoDB");
			})
			.catch((err: Error) => {
				console.log(
					"MongoDB connection error. Please make sure MongoDB is running. " +
						err
				);
			});
		return AppUtils;
	};

	/** listens to port */
	private static startListen = (app: Application) => {
		// Express configuration
		app.set("port", process.env.PORT || 5000);
		return AppUtils;
	};

	/** adds basic endpoints */
	private static addTestEndpoints = (app: Application) => {
		app.get("/", (_req, res) => {
			res.send("Hello from the API!");
		});

		app.get("/status", (_req, res) => {
			res.send("API is up and running...");
		});
		return AppUtils;
	};
}
