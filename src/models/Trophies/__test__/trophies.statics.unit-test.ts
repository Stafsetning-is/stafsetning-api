import { Trophies } from "../../";
import app from "../../../app";

describe("Trophies unit tests", () => {
	it("Should get an array of trophies", async (done) => {
		const userId = app.get("userId");
		const trophies = await Trophies.allocateNewTrophiesToUser(userId);
		expect(Array.isArray(trophies)).toBe(true);
		done();
	});
});
