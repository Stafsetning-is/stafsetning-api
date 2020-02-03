import express from "express";
import compression from "compression";  // compresses requests
import session from "express-session";
import bodyParser from "body-parser";
import mongo from "connect-mongo";
import path from "path";
import mongoose from "mongoose";
import { MONGODB_URI, SESSION_SECRET } from "./util/secrets";
import {Person} from "./models";

const MongoStore = mongo(session);

// Create Express server
const app = express();

// Connect to MongoDB
const mongoUrl = MONGODB_URI;

mongoose.connect(mongoUrl, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true } ).then(
    () => {
        console.log("Connected to MongoDB");
    }
).catch((err: any) => {
    console.log("MongoDB connection error. Please make sure MongoDB is running. " + err);
});

// Express configuration
app.set("port", process.env.PORT || 3000);
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
    resave: true,
    saveUninitialized: true,
    secret: SESSION_SECRET,
    store: new MongoStore({
        url: mongoUrl,
        autoReconnect: true
    })
}));

app.use(
    express.static(path.join(__dirname, "public"), { maxAge: 31557600000 })
);





export default app;
