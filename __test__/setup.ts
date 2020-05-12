import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import {
	Users,
	Practices,
	Exercises,
	Trophies,
	UserTrophies,
	SavedExercises,
} from "../src/models";
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
			useCreateIndex: true,
			useFindAndModify: false,
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
			min: 1,
			max: 5,
		},
		parts: [
			"Kalli for ut i bud",
			"til ad kaupa mjolk,",
			"handa mommu sinni.",
		],
		owner: adminSignupData.user._id,
		fileName: "test",
	});
	const exercise2 = await Exercises.create({
		difficultRange: {
			min: 1,
			max: 5,
		},
		parts: [
			"Kalli for ut i bud",
			"til ad kaupa mjolk,",
			"handa mommu sinni.",
		],
		owner: adminSignupData.user._id,
		fileName: "test2",
	});
	await SavedExercises.create({
		user: signupData.user._id,
		exercise: exercise2._id,
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
	const trophy = await Trophies.create({
		rules: [],
		title: "Byrjandi",
		description:
			"Það eru allir byrjendur einhverntíman. Þú mátt vera stolt/ur af því að vera kominn af stað. Haltu þessu áfram!",
		icon: "faBaby",
	});
	await UserTrophies.create({
		trophy: trophy._id,
		user: signupData.user._id,
	});
	app.set("testToken", signupData.token);
	app.set("userId", signupData.user._id);
	app.set("adminTestToken", adminSignupData.token);
	app.set("exerciseId", exercise._id);
	app.set("practiceId", practice._id);
	return done();
});

afterAll(async (done) => {
	await mongoose.disconnect();
	await mongoServer.stop();
	done();
});

jest.setTimeout(30000);
