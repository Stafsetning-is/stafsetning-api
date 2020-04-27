import request from "supertest";
import app from "../../../../app";

describe("Auth routes", () => {
	it("GET /api/v1/users/auth requires token", async (done) => {
		const { status } = await request(app).get("/api/v1/users/auth");
		expect(status).toEqual(401);
		done();
	});

	it("GET /api/v1/users/auth responds with 200 with correct token", async (done) => {
		const token = app.get("testToken");
		const { body, status } = await request(app)
			.get("/api/v1/users/auth")
			.set({ Authorization: `Bearer ${token}` });
		expect(status).toEqual(200);
		done();
	});

	it("GET /api/v1/users/auth responds with 200 with correct token", async (done) => {
		const token = app.get("testToken");
		const { body } = await request(app)
			.get("/api/v1/users/auth")
			.set({ Authorization: `Bearer ${token}` });
		expect(body).toHaveProperty("_id");
		expect(body).toHaveProperty("name");
		expect(body).toHaveProperty("type");
		done();
	});

	it("POST /api/v1/users/exercises/:id/save requires auth", async (done) => {
		const { status } = await request(app).post(
			"/api/v1/users/exercises/1234/save"
		);
		expect(status).toEqual(401);
		done();
	});

	it("POST /api/v1/users/exercises/:id/save responds with 201 with correct auth", async (done) => {
		const token = app.get("testToken");
		const exerciseId = app.get("exerciseId");
		const { status } = await request(app)
			.post(`/api/v1/users/exercises/${exerciseId}/save`)
			.set({ Authorization: `Bearer ${token}` });
		expect(status).toEqual(201);
		done();
	});

	it("POST /api/v1/users/exercises/:id/save responds with 400 when given invalid inupt values", async (done) => {
		const token = app.get("testToken");
		const { status } = await request(app)
			.post("/api/v1/users/exercises/1234/save")
			.set({ Authorization: `Bearer ${token}` });
		expect(status).toEqual(400);
		done();
	});

	it("POST /api/v1/users/exercises/:id/unsave requires auth", async (done) => {
		const { status } = await request(app).post(
			"/api/v1/users/exercises/1234/unsave"
		);
		expect(status).toEqual(401);
		done();
	});

	it("POST /api/v1/users/exercises/:id/unsave responds with 200 with correct auth", async (done) => {
		const token = app.get("testToken");
		const exerciseId = app.get("exerciseId");
		const { status } = await request(app)
			.post(`/api/v1/users/exercises/${exerciseId}/unsave`)
			.set({ Authorization: `Bearer ${token}` });
		expect(status).toEqual(201);
		done();
	});

	it("POST /api/v1/users/exercise/:id/unsave responds with 400 when given inupt values", async (done) => {
		const token = app.get("testToken");
		const { status } = await request(app)
			.post("/api/v1/users/exercises/1234/unsave")
			.set({ Authorization: `Bearer ${token}` });
		expect(status).toEqual(400);
		done();
	});
});
