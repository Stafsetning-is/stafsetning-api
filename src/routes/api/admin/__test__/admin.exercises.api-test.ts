import request from "supertest";
import app from "../../../../app";

describe("Trophies routes", () => {
	it("POST /api/admin/exercises responds with 401 withot admin token", async (done) => {
		const { status } = await request(app).post("/api/admin/exercises");
		expect(status).toEqual(401);
		done();
	});

	it("POST /api/admin/exercises responds with 400 with invalid body", async (done) => {
		const token = app.get("adminTestToken");
		const { status } = await request(app)
			.post("/api/admin/exercises")
			.set({ Authorization: `Bearer ${token}` });
		expect(status).toEqual(400);
		done();
	});

	it("POST /api/admin/exercises responds with 201 and correct body", async (done) => {
		const token = app.get("adminTestToken");
		const { status, body } = await request(app)
			.post("/api/admin/exercises")
			.send({
				difficultRange: {
					min: 1,
					max: 3,
				},
				parts: [
					"Kalli fór",
					"út í búð",
					"til þess að",
					"kaupa mjólk",
					"handa mömmu sinni",
				],
				fileName: "kalli",
			})
			.set({ Authorization: `Bearer ${token}` });
		expect(status).toEqual(201);
		expect(body).toHaveProperty("fileName");
		expect(body).toHaveProperty("owner");
		expect(body).toHaveProperty("_id");
		expect(body).toHaveProperty("difficultRange");
		expect(body).toHaveProperty("parts");
		done();
	});

	it("GET /api/admin/exercises/file_name responds with 401 withot admin token", async (done) => {
		const { status } = await request(app).get(
			"/api/admin/exercises/file_name"
		);
		expect(status).toEqual(401);
		done();
	});

	it("GET /api/admin/exercises/file_name responds with 404 with no file name", async (done) => {
		const token = app.get("adminTestToken");
		const { status, body } = await request(app)
			.get("/api/admin/exercises/file_name")
			.set({ Authorization: `Bearer ${token}` });
		expect(status).toEqual(404);
		expect(body).toHaveProperty("message");
		done();
	});

	it("GET /api/admin/exercises/file_name responds with 404 with incorrect file name", async (done) => {
		const token = app.get("adminTestToken");
		const { status, body } = await request(app)
			.get("/api/admin/exercises/file_name?name=wrong_name")
			.set({ Authorization: `Bearer ${token}` });
		expect(status).toEqual(404);
		expect(body).toHaveProperty("message");
		done();
	});

	it("GET /api/admin/exercises/file_name responds with 200 and correct file name", async (done) => {
		const token = app.get("adminTestToken");
		const { status, body } = await request(app)
			.get("/api/admin/exercises/file_name?name=test")
			.set({ Authorization: `Bearer ${token}` });
		expect(status).toEqual(200);
		expect(body).toHaveProperty("fileName");
		expect(body).toHaveProperty("owner");
		expect(body).toHaveProperty("_id");
		expect(body).toHaveProperty("difficultRange");
		expect(body).toHaveProperty("parts");
		done();
	});

	it("POST /api/admin/exercises/:id/publish responds with 401 withot admin token", async (done) => {
		const { status } = await request(app).post(
			"/api/admin/exercises/123/publish"
		);
		expect(status).toEqual(401);
		done();
	});

	it("POST /api/admin/exercises/:id/publish responds with 400 with invalid id", async (done) => {
		const token = app.get("adminTestToken");
		const { status } = await request(app)
			.post("/api/admin/exercises/123/publish")
			.set({ Authorization: `Bearer ${token}` });
		expect(status).toEqual(400);
		done();
	});

	it("POST /api/admin/exercises/:id/publish responds with 200 with valid id", async (done) => {
		const token = app.get("adminTestToken");
		const { status, body } = await request(app)
			.post(`/api/admin/exercises/${app.get("exerciseId")}/publish`)
			.send()
			.set({ Authorization: `Bearer ${token}` });
		expect(status).toEqual(200);
		expect(body).toHaveProperty("fileName");
		expect(body).toHaveProperty("owner");
		expect(body).toHaveProperty("_id");
		expect(body).toHaveProperty("difficultRange");
		expect(body).toHaveProperty("parts");
		done();
	});

	it("POST /api/admin/exercises/update responds with 401 withot admin token", async (done) => {
		const { status } = await request(app).post(
			"/api/admin/exercises/update"
		);
		expect(status).toEqual(401);
		done();
	});

	it("POST /api/admin/exercises/update responds with 400 with invalid id", async (done) => {
		const token = app.get("adminTestToken");
		const { status, body } = await request(app)
			.post("/api/admin/exercises/update")
			.send({ _id: "1234" })
			.set({ Authorization: `Bearer ${token}` });
		expect(status).toEqual(404);
		expect(body).toHaveProperty("message", "Unable to save exercise");
		done();
	});

	it("POST /api/admin/exercises/update responds with 200 with valid body", async (done) => {
		const token = app.get("adminTestToken");
		const { status, body } = await request(app)
			.post("/api/admin/exercises/update")
			.send({
				_id: app.get("exerciseId"),
				fileName: "test2",
				parts: ["text part,", "and this"],
				difficultRange: {
					min: 4,
					max: 5,
				},
			})
			.set({ Authorization: `Bearer ${token}` });
		expect(status).toEqual(200);
		expect(body).toHaveProperty("fileName", "test2");
		expect(body).toHaveProperty("owner");
		expect(body).toHaveProperty("_id");
		expect(body).toHaveProperty("difficultRange");
		expect(body).toHaveProperty("parts");
		done();
	});
});
