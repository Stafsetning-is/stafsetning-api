import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";

mongoose.Promise = Promise;

mongoose.set("useNewUrlParser", true);
mongoose.set("useFindAndModify", false);
mongoose.set("useCreateIndex", true);
mongoose.set("useUnifiedTopology", true);

/**
 * Setup to connect mongoose to mongo-memory-server
 * for tests
 */
beforeAll((done) => {
	const mongoServer = new MongoMemoryServer();

	mongoServer.getUri().then((mongoUri) => {
		mongoose.connect(mongoUri);
		mongoose.connection.once("open", () => {
            console.log(`MongoDB successfully connected to ${mongoUri}`);
            done();
		});
	});
});
