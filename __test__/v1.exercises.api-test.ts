import request from "supertest";
import app from "../src/app";

describe("Exercise Routes V1", () => {
	it("GET /api/v1/exercises/by_difficulty/ requires auth", async (done) => {
		const { body, status } = await request(app).get(
			"/api/v1/exercises/by_difficulty/"
		);
		expect(status).toEqual(401);
		done();
	});

	it("GET /api/v1/exercises/by_difficulty/ sends array", async (done) => {
		const token = app.get("testToken");
		const { status } = await request(app)
			.get("/api/v1/exercises/by_difficulty/")
			.set({ Authorization: `Bearer ${token}` });
		expect(status).toEqual(200);
		done();
	});
});
