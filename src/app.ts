import express from "express";
import compression from "compression";  // compresses requests
//import session from "express-session";
import bodyParser from "body-parser";
//import mongo from "connect-mongo";
import path from "path";
<<<<<<< HEAD
import mongoose from "mongoose";
import { MONGODB_URI, SESSION_SECRET } from "./util/secrets";
import Router from "./routes"
import cors from "cors";
=======
//import auth from "auth.ts";
//import mongoose from "mongoose";
//import { MONGODB_URI, SESSION_SECRET } from "./util/secrets";
//import * as fb from "firebase/app";
import "firebase/auth";
import * as admin from "firebase-admin";

// eslint-disable-next-line @typescript-eslint/no-var-requires
// const serviceAccount = require("../ServiceAccountKey.json");

// admin.initializeApp({
//     credential: admin.credential.cert(serviceAccount)
// });
>>>>>>> 654ac618637c74b8c6138bc98c0fabe1e12da0d2

// Create Express server
const app = express();
app.use(cors())

// Connect to MongoDB
const mongoUrl = MONGODB_URI;
const MongoStore = mongo(session);
mongoose.connect(mongoUrl, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true } ).then(
    () => {
        console.log("Connected to MongoDB");
    }
).catch((err: any) => {
    console.log("MongoDB connection error. Please make sure MongoDB is running. " + err);
});
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

<<<<<<< HEAD
app.use("/", Router);
=======
app.get("/", (req, res) => {
    res.send("Hello from the API!");
});

app.get("/status", (req, res) => {
    res.send("API is up and running...");
});

const authorizeUser = (uid: string) => {
    admin.auth().createCustomToken(uid)
        .then((customToken) => {
            return customToken;
        })
        .catch((error) => {
            console.log("Error creating custom token:", error);
        });
};

app.post("/signup", (req, res) => {
    const authToken = authorizeUser(req.body.uid);
    res.send(authToken);
});

// Default: Not supported
app.use("*", (req, res) => {
    res.status(405).send("Operation not supported.");
});
>>>>>>> 654ac618637c74b8c6138bc98c0fabe1e12da0d2

export default app;
