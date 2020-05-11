import express from "express";
import Router from "../routes";
import appUtils from "./utils";

// Create Express server
const app = express();

// setting up express app
appUtils.setup(app);

// connecting routes
app.use("/", Router);

export default app;
