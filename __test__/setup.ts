import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import { Users, Practices, Exercises } from "../src/models";
import app from "../src/app";
import { exec } from "child_process";
let mongoServer: MongoMemoryServer;

beforeAll(async (done) => {
	mongoServer = new MongoMemoryServer();
	const mongoUri = await mongoServer.getUri();
	exec(`echo ${mongoUri}`);
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
	await Users.createIndexes();
	const signupData = await Users.register({
		name: "Pope John Paul II",
		password: "Password12.3",
		mobile: "5812345",
		type: "user",
		username: "paulyp",
		difficulty: 5,
	});
	const adminSignupData = await Users.register({
		name: "Admin Pope",
		password: "Password12.3",
		mobile: "3959373",
		type: "user",
		username: "dungeon master admin",
		difficulty: 5,
	});
	const admin = await Users.findById(adminSignupData.user._id);
	await admin.makeAdmin();
	const exercise = await Exercises.create({
		difficultRange: {
			min: 0,
			max: 0,
		},
		text: "Kalli fór út í búð;;; til ad kaupa mjólk,;;; handa mömmu sinni.",
	});
	await Practices.create({
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
	app.set("userId", signupData.user._id);
	app.set("adminTestToken", adminSignupData.token);
	app.set("exerciseId", exercise._id);
	done();
});

afterAll(async () => {
	await mongoose.disconnect();
	await mongoServer.stop();
});
