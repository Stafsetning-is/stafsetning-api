import logger from "./logger";
import dotenv from "dotenv";
import fs from "fs";

if (fs.existsSync(".env")) {
	logger.debug("Using .env file to supply config environment variables");
	dotenv.config({ path: ".env" });
} else {
	logger.error("You must create an .env file.");
	process.exit(1);
}
export const ENVIRONMENT = process.env.NODE_ENV;
const prod = ENVIRONMENT === "production"; // Anything else is treated as 'dev'

// Switched MONGODB_URI_LOCAL with MONGODB_URI
export const SESSION_SECRET = process.env["SESSION_SECRET"];
export const MONGODB_URI = prod
	? process.env["MONGODB_URI"]
	: process.env["MONGODB_URI_LOCAL"];
export const USER_PW_HASH_KEY = process.env["USER_PW_HASH_KEY"];

if (!SESSION_SECRET) {
	logger.error("No client secret. Set SESSION_SECRET environment variable.");
	process.exit(1);
}

if (!MONGODB_URI) {
	if (prod) {
		logger.error(
			"No mongo connection string. Set MONGODB_URI environment variable."
		);
	} else {
		logger.error(
			"No mongo connection string. Set MONGODB_URI_LOCAL environment variable."
		);
	}
	process.exit(1);
}

if (!USER_PW_HASH_KEY) {
	logger.error(
		"No hashing key in env. Set USER_PW_HASH_KEY environment variable."
	);
	process.exit(1);
}
