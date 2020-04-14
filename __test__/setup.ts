import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import { Users, Practices, Exercises } from "../src/models";
import app from "../src/app";
let mongoServer: MongoMemoryServer;

beforeAll(async (done) => {
    mongoServer = new MongoMemoryServer();
    const mongoUri = await mongoServer.getUri();
    await mongoose.connect(
        mongoUri,
        {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        },
        (err) => {
            if (err) console.error(err);
        }
    );
    await Users.ensureIndexes();
    const signupData = await Users.register({
        name: "Pope John Paul II",
        password: "Password12.3",
        mobile: "5812345",
        type: "user",
        username: "paulyp",
        difficulty: 5,
    });
    const exercise = await Exercises.create({
        difficultRange: {
            min: 0,
            max: 0,
        },
        text: "Kalli fór út í búð;;; til ad kaupa mjólk,;;; handa mömmu sinni.",
    });
    const practice = await Practices.create({
        duration: 25,
        exerciseString: "Kalli for ut i bud",
        exercise: exercise._id,
        errorItems: [
            { charAt: 2, typed: "c" },
            { charAt: 8, typed: "c" },
        ],
        user: signupData.user._id,
    });
    app.set("testToken", signupData.token);
    done();
});

afterAll(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
});
