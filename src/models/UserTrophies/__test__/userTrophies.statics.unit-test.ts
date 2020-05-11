import { UserTrophies } from "../../";
import app from "../../../app";
import { isObject } from "../../../../__test__/utils";

describe("User trophies unit tests", () => {
	it("Should get an single trophy", async (done) => {
		const userId = app.get("userId");
		const trophy = await UserTrophies.handOutTrophyToUser(userId);
		expect(isObject(trophy)).toBe(true);
		done();
	});
});
