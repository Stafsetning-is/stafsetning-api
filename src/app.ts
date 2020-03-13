import express from "express";
import compression from "compression";  // compresses requests
import session from "express-session";
import bodyParser from "body-parser";
import mongo from "connect-mongo";
import path from "path";
import mongoose from "mongoose";
import { MONGODB_URI, SESSION_SECRET, FIREBASE_KEY } from "./util/secrets";
import Router from "./routes";
import cors from "cors";
import * as admin from "firebase-admin";

/**
 * ATH EKKI NOTA REQUIRE.. thad er onnur lausn en aad nota thad
 */
// eslint-disable-next-line @typescript-eslint/no-var-requires
// const serviceAccount = require("../ServiceAccountKey.json");

admin.initializeApp({
    credential: admin.credential.cert(FIREBASE_KEY)
});

// Create Express server
const app = express();
app.use(cors());

// Connect to MongoDB
const mongoUrl = MONGODB_URI;
const MongoStore = mongo(session);
mongoose.connect(mongoUrl, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true } ).then(
    () => {
        console.log("Connected to MongoDB");
    }
).catch((err: Error) => {
    console.log("MongoDB connection error. Please make sure MongoDB is running. " + err);
});

// Mongo middleware to express
app.use(session({
    resave: true,
    saveUninitialized: true,
    secret: SESSION_SECRET,
    store: new MongoStore({
        url: mongoUrl,
        autoReconnect: true
    })
}));


// Express configuration
app.set("port", process.env.PORT || 5000);
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.use(
    express.static(path.join(__dirname, "public"), { maxAge: 31557600000 })
);

app.get("/", (req, res) => {
    res.send("Hello from the API!");
});

app.get("/status", (req, res) => {
    res.send("API is up and running...");
});

app.get("/coffee", (req, res) => {
    res.status(418).send("You attempted to brew coffee with a teapot.");
});

app.post("/signup", (req, res) => {
    admin.auth().createCustomToken(req.body.uid)
        .then((customToken) => {
            res.send(customToken);
        })
        .catch((error) => {
            console.log("Error creating custom token:", error);
            res.status(401).send(error);
        });
});

// connect routes to app
app.use("/", Router);

app.get("*", (req, res) => {
    res.status(404).send();
});

export default app;
