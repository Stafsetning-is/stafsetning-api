import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import { Users } from "../src/models";
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
	const signupData = await Users.register({
		name: "Pope John Paul II",
		password: "Password12.3",
		mobile: "5812345",
		type: "user",
		username: "paulyp",
		difficulty: 5,
	});
	await Users.ensureIndexes();
	app.set("testToken", signupData.token);
	done();
});

afterAll(async () => {
	await mongoose.disconnect();
	await mongoServer.stop();
});
