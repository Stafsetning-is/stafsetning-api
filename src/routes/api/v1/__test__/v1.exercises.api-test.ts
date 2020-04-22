import request from "supertest";
import app from "../../../../app";

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

	it("POST /api/v1/exercises/complete requires auth", async (done) => {
		const token = app.get("testToken");
		const { body, status } = await request(app).post(
			"/api/v1/exercises/complete"
		);
		expect(status).toEqual(401);
		done();
	});

	it("GET /api/v1/exercises/:id requires auth", async (done) => {
		const exerciseId = app.get("exerciseId");
		const { body, status } = await request(app).get(
			`/api/v1/exercises/${exerciseId}`
		);
		expect(status).toEqual(401);
		done();
	});

	it("GET /api/v1/exercises/:id works with auth", async (done) => {
		const token = app.get("testToken");
		const exerciseId = app.get("exerciseId");
		const { body, status } = await request(app)
			.get(`/api/v1/exercises/${exerciseId}`)
			.set({ Authorization: `Bearer ${token}` });
		expect(status).toEqual(200);
		expect(body).toHaveProperty("_id");
		expect(body).toHaveProperty("parts");
		done();
	});

	it("GET /api/v1/exercises/:id sends 404 with incorrect Id", async (done) => {
		const token = app.get("testToken");
		const exerciseId = app.get("exerciseId");
		const { body, status } = await request(app)
			.get("/api/v1/exercises/5e9b68ce687005eecdaf8c92")
			.set({ Authorization: `Bearer ${token}` });
		expect(status).toEqual(404);
		done();
	});

	/**
	 * Vantar
	 *
	 * [ ] success case complete exercise
	 * [ ] faera create
	 */
});
