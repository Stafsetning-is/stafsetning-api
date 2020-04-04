import express from "express";
import Router from "./routes";
import * as appUtils from "./appUtils";

// Create Express server
const app = express();

// setting up express app
appUtils.setupMiddleware(app);
appUtils.startListen(app);
appUtils.connectRouter(Router, app, "/");
appUtils.connectMongo();
appUtils.addTestEndpoints(app);

export default app;
