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

export const setupMiddleware = (app: Application) => {
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
};

export const connectMongo = () => {
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
				"MongoDB connection error. Please make sure MongoDB is running. " + err
			);
		});
};

export const startListen = (app: Application) => {
	// Express configuration
	app.set("port", process.env.PORT || 5000);
};

export const addTestEndpoints = (app: Application) => {
	app.get("/", (_req, res) => {
		res.send("Hello from the API!");
	});

	app.get("/status", (_req, res) => {
		res.send("API is up and running...");
	});

	app.use("*", (_req, res) => {
		res.status(405).send("Operation not supported");
	});
};

export const connectRouter = (
	router: Router,
	app: Application,
	route: string
) => {
	app.use(route, router);
};
