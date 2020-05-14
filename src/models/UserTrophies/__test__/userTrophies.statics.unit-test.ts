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

	it("Should throw an error if a trophy is requested twice", async (done) => {
		const userId = app.get("userId");
		const create1 = async () => {
			try {
				await UserTrophies.handOutTrophyToUser(userId);
			} catch (error) {
				throw Error("test");
			}
		};
		const create2 = async () => {
			try {
				await UserTrophies.handOutTrophyToUser(userId);
			} catch (error) {
				throw Error("test");
			}
		};
		await create1();
		const trophy = await create2();
		await expect(trophy).toBeFalsy();
		done();
	});
});
