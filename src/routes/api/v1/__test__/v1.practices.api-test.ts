import request from "supertest";
import app from "../../../../app";
import practices from "../practices";

describe("Practice Routes V1", () => {
	it("GET /api/v1/practices requires auth", async (done) => {
		const { status } = await request(app).get("/api/v1/practices");
		expect(status).toEqual(401);
		done();
	});

	it("GET /api/v1/practices response with 200 with correct authentication", async (done) => {
		const token = app.get("testToken");
		const { body, status } = await request(app)
			.get("/api/v1/practices")
			.set({ Authorization: `Bearer ${token}` });
		expect(status).toEqual(200);
		const isArray = Array.isArray(body);
		expect(isArray).toBe(true);
		done();
	});

	it("GET /api/v1/practices/:id/proverb response with 200 with correct authentication", async (done) => {
		const token = app.get("testToken");
		const { body } = await request(app)
			.get("/api/v1/practices")
			.set({ Authorization: `Bearer ${token}` });
		const practiceID = body[0].practice;
		const { status } = await request(app)
			.get(`/api/v1/practices/${practiceID}/proverb`)
			.set({ Authorization: `Bearer ${token}` });
		expect(status).toEqual(200);
		done();
	});

	/**
	 * Vantar
	 *
	 * [ ] fail og success a post
	 * [ ] fail og success a get by id
	 */
});
