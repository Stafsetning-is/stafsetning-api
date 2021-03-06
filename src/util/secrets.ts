import logger from "./logger";
import dotenv from "dotenv";
import fs from "fs";

export const ENVIRONMENT = process.env.NODE_ENV;
const prod = ENVIRONMENT === "production"; // Anything else is treated as 'dev'
const test = ENVIRONMENT === "test";

const exitProcess = () => {
	if (test) return;
	process.exit(1);
};

if (fs.existsSync(".env")) {
	logger.debug("Using .env file to supply config environment variables");
	dotenv.config({ path: ".env" });
} else if (prod) {
	logger.debug(
		"Using heroku config variables to supply environment variables"
	);
} else {
	logger.error("You must create an .env file.");
	exitProcess();
}

// Switched MONGODB_URI_LOCAL with MONGODB_URI
export const SESSION_SECRET = process.env["SESSION_SECRET"];
export const MONGODB_URI = prod
	? process.env["MONGODB_URI"]
	: process.env["MONGODB_URI_LOCAL"];
export const USER_PW_HASH_KEY = test
	? "testingkey"
	: process.env["USER_PW_HASH_KEY"];

export const REDIS_URL = prod
	? process.env["REDIS_URL"]
	: process.env["REDIS_URL_LOCAL"];

if (!SESSION_SECRET) {
	logger.error("No client secret. Set SESSION_SECRET environment variable.");
	exitProcess();
}
export const S3_ACCESS_KEY = process.env["S3_ACCESS_KEY"];
export const S3_SECRET_KEY = process.env["S3_SECRET_KEY"];
export const AVATAR_BUCKET_NAME = process.env["AVATAR_BUCKET_NAME"];

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
	exitProcess();
}

if (!USER_PW_HASH_KEY) {
	logger.error(
		"No hashing key in env. Set USER_PW_HASH_KEY environment variable."
	);
	exitProcess();
}

if (!S3_ACCESS_KEY) {
	logger.error(
		"No amazon s3 access key in env. Set S3_ACCESS_KEY environment variable."
	);
	exitProcess();
}

if (!S3_SECRET_KEY) {
	logger.error(
		"No amazon s3 secret key in env. Set S3_SECRET_KEY environment variable."
	);
	exitProcess();
}

if (!AVATAR_BUCKET_NAME) {
	logger.error(
		"No amazon s3 bucket name for avatrs in env. Set AVATAR_BUCKET_NAME environment variable."
	);
	exitProcess();
}

if (!REDIS_URL) {
	logger.error(
		"No amazon redis url env. Set REDIS_URL environment variable. Usually it is local host port 6379 during development"
	);
	exitProcess();
}
