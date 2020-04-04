import winston, { format } from "winston";

const logger = winston.createLogger({
	transports: [
		new winston.transports.Console({
			level: process.env.NODE_ENV === "production" ? "error" : "debug",
		}),
		new winston.transports.File({ filename: "debug.log", level: "debug" }),
		new winston.transports.Console(),
	],
	format: format.combine(format.timestamp(), format.json()),
});

if (process.env.NODE_ENV === "test") {
	logger.silent = true;
}

if (process.env.NODE_ENV !== "production") {
	logger.debug("Logging initialized at debug level");
} else {
	logger.debug("Logging initialized at production level");
}

export default logger;
