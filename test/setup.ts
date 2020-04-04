import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import { Users } from "../src/models";

let mongoServer: MongoMemoryServer;

beforeAll(async () => {
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
	await Users.create({
		name: "Pope John Paul II",
		password: "Password12.3",
		mobile: "5812345",
		type: "user",
		username: "paulyp",
		difficulty: 5,
	});
});

afterAll(async () => {
	await mongoose.disconnect();
	await mongoServer.stop();
});
