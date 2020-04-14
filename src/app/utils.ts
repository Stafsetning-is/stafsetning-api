import express, { Application } from "express";
import rateLimit from "express-rate-limit";
import compression from "compression";
import bodyParser from "body-parser";
import path from "path";
import session from "express-session";
import mongoose from "mongoose";
import mongo from "connect-mongo";
import { MONGODB_URI, SESSION_SECRET } from "../util/secrets";
import cors from "cors";
import logger from "../util/logger";
import { env } from "shelljs";

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
		AppUtils.setupMiddleware(app);
		AppUtils.setPort(app);
		AppUtils.addTestEndpoints(app);
		AppUtils.connectMongo();
	}

	/**
	 * Adds basic middleware
	 */
	private static setupMiddleware = (app: Application) => {
		// Enable cors
		app.use(cors());

		// Mongo middleware to express
		app.use(
			session({
				resave: true,
				saveUninitialized: true,
				secret: SESSION_SECRET,
				store: new (mongo(session))({
					url: MONGODB_URI,
					autoReconnect: true,
				}),
			})
		);

		// request rate limits from same ip adddress
		app.use(
			rateLimit({
				windowMs: 15 * 60 * 1000,
				max: 100,
			})
		);

		// compression middlewae
		app.use(compression());

		// use body-parser middleware
		app.use(bodyParser.json());
		app.use(bodyParser.urlencoded({ extended: true }));

		// set static folder
		app.use(
			express.static(path.join(__dirname, "public"), { maxAge: 31557600000 })
		);
	};

	/**
	 * Connects to mongo
	 */
	private static connectMongo = async () => {
		if (env.NODE_ENV === "test") return;
		try {
			await mongoose.connect(MONGODB_URI, {
				useNewUrlParser: true,
				useCreateIndex: true,
				useUnifiedTopology: true,
			});
			logger.log("info", "Connected to MongoDB");
		} catch (error) {
			logger.log(
				"error",
				"MongoDB connection error. Please make sure MongoDB is running. " +
					error
			);
		}
	};

	/**
	 * sets port
	 * */
	private static setPort = (app: Application) => {
		// Express configuration
		app.set("port", process.env.PORT || 5000);
	};

	/**
	 * adds basic endpoints
	 * */
	private static addTestEndpoints = (app: Application) => {
		app.get("/", (_req, res) => {
			res.send("Hello from the API!");
		});
	};
}
