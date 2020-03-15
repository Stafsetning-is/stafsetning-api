import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";

const mongoServer = new MongoMemoryServer();
// mongoose.Promise = Promise;

mongoose.set("useNewUrlParser", true);
mongoose.set("useFindAndModify", false);
mongoose.set("useCreateIndex", true);
mongoose.set("useUnifiedTopology", true);

/**
 * Setup to connect mongoose to mongo-memory-server
 * for tests
 */
beforeAll(async (done) => {
	
	try {
		const mongouri = await mongoServer.getUri();
		await mongoose.connect(mongouri);
	} catch (error) {
		
	} finally {
		done();
	}
});

afterAll(async (done) => {
	// Closing the DB connection allows Jest to exit successfully.

	try {
		await mongoServer.stop();
		await mongoose.connection.close();
	} catch (error) {
		// handle error
	} finally {
		done();
	}
});
