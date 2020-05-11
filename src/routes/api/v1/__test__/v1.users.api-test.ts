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

	it("POST /api/v1/users/password responds with 401 with bad auth", async (done) => {
		const { status } = await request(app).post("/api/v1/users/password");
		expect(status).toEqual(401);
		done();
	});

	it("POST /api/v1/users/password responds with 400 with incorrect old password", async (done) => {
		const token = app.get("testToken");
		const { status } = await request(app)
			.post("/api/v1/users/password")
			.set({ Authorization: `Bearer ${token}` })
			.send({
				password: "not_correcT_pw",
				newPassword: "1b2b3b4b5",
			});
		expect(status).toEqual(400);
		done();
	});

	it("POST /api/v1/users/password responds with 200 with correct data", async (done) => {
		const token = app.get("testToken");
		const { status, body } = await request(app)
			.post("/api/v1/users/password")
			.set({ Authorization: `Bearer ${token}` })
			.send({
				password: "Password12.3",
				newPassword: "1b2b3b4b5",
			});
		expect(status).toEqual(200);
		expect(body).toEqual({ message: "password successfully changed" });
		done();
	});

	it("POST /api/v1/users/password responds with 400 with missing data in body", async (done) => {
		const token = app.get("testToken");
		const { status, body } = await request(app)
			.post("/api/v1/users/password")
			.set({ Authorization: `Bearer ${token}` })
			.send({});
		expect(status).toEqual(400);
		done();
	});

	it("POST /api/v1/users/difficulty responds with 401 with bad auth", async (done) => {
		const { status } = await request(app).post("/api/v1/users/difficulty");
		expect(status).toEqual(401);
		done();
	});

	it("POST /api/v1/users/difficulty responds with 400 with missing data in body", async (done) => {
		const token = app.get("testToken");
		const { status } = await request(app)
			.post("/api/v1/users/difficulty")
			.set({ Authorization: `Bearer ${token}` });
		expect(status).toEqual(400);
		done();
	});

	it("POST /api/v1/users/difficulty responds with 200 with correct data in body", async (done) => {
		const token = app.get("testToken");
		const { status } = await request(app)
			.post("/api/v1/users/difficulty")
			.send({
				difficulty: 4,
			})
			.set({ Authorization: `Bearer ${token}` });
		expect(status).toEqual(200);
		done();
	});

	it("POST /api/v1/users/gender responds with 401 with bad auth", async (done) => {
		const { status } = await request(app).post("/api/v1/users/gender");
		expect(status).toEqual(401);
		done();
	});

	it("POST /api/v1/users/gender responds with 400 with missing data in body", async (done) => {
		const token = app.get("testToken");
		const { status } = await request(app)
			.post("/api/v1/users/gender")
			.set({ Authorization: `Bearer ${token}` });
		expect(status).toEqual(400);
		done();
	});

	it("POST /api/v1/users/gender responds with 200 with correct data in body", async (done) => {
		const token = app.get("testToken");
		const { status } = await request(app)
			.post("/api/v1/users/gender")
			.send({
				gender: "female",
			})
			.set({ Authorization: `Bearer ${token}` });
		expect(status).toEqual(200);
		done();
	});

	it("POST /api/v1/users/preferences responds with 401 with bad auth", async (done) => {
		const { status } = await request(app).post("/api/v1/users/preferences");
		expect(status).toEqual(401);
		done();
	});

	it("POST /api/v1/users/preferences responds with 200 with no data in body", async (done) => {
		const token = app.get("testToken");
		const { status } = await request(app)
			.post("/api/v1/users/preferences")
			.set({ Authorization: `Bearer ${token}` });
		expect(status).toEqual(200);
		done();
	});

	it("POST /api/v1/users/preferences responds with 200 with correct data in body", async (done) => {
		const token = app.get("testToken");
		const { status, body } = await request(app)
			.post("/api/v1/users/preferences")
			.send({
				showOnScreenKeyboard: true,
			})
			.set({ Authorization: `Bearer ${token}` });
		expect(status).toEqual(200);
		expect(body.showOnScreenKeyboard).toEqual(true);
		done();
	});

	it("GET /api/v1/users/exercises/saved responds with 401 with bad auth", async (done) => {
		const { status } = await request(app).get(
			"/api/v1/users/exercises/saved"
		);
		expect(status).toEqual(401);
		done();
	});

	it("GET /api/v1/users/exercises/saved responds with 200 and an array body", async (done) => {
		const token = app.get("testToken");
		const { status, body } = await request(app)
			.get("/api/v1/users/exercises/saved")
			.set({ Authorization: `Bearer ${token}` });
		expect(status).toEqual(200);
		expect(Array.isArray(body)).toBe(true);
		done();
	});

	it("GET /api/v1/users/trophies responds with 401 with bad auth", async (done) => {
		const { status } = await request(app).get("/api/v1/users/trophies");
		expect(status).toEqual(401);
		done();
	});

	it("GET /api/v1/users/trophies responds with 200 and an array body", async (done) => {
		const token = app.get("testToken");
		const { status, body } = await request(app)
			.get("/api/v1/users/trophies")
			.set({ Authorization: `Bearer ${token}` });
		expect(status).toEqual(200);
		expect(Array.isArray(body)).toBe(true);
		done();
	});
});
