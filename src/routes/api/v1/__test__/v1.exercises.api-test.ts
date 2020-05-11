import request from "supertest";
import app from "../../../../app";
import { isObject } from "../../../../../__test__/utils";

describe("Exercise Routes V1", () => {
	it("GET /api/v1/exercises/by_difficulty/ requires auth", async (done) => {
		const { status } = await request(app).get(
			"/api/v1/exercises/by_difficulty/"
		);
		expect(status).toEqual(401);
		done();
	});

	it("GET /api/v1/exercises/by_difficulty/ sends array", async (done) => {
		const token = app.get("testToken");
		const { status, body } = await request(app)
			.get("/api/v1/exercises/by_difficulty/")
			.set({ Authorization: `Bearer ${token}` });
		expect(status).toEqual(200);
		expect(Array.isArray(body)).toBe(true);
		done();
	});
	it("GET /api/v1/exercises/:id requires auth", async (done) => {
		const exerciseId = app.get("exerciseId");
		const { status } = await request(app).get(
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
		expect(isObject(body)).toBe(true);
		expect(body).toHaveProperty("_id");
		expect(body).toHaveProperty("parts");
		expect(Array.isArray(body.parts)).toBe(true);
		expect(body).toHaveProperty("length");
		expect(body).toHaveProperty("title");
		expect(body).toHaveProperty("difficultRange", { min: 1, max: 5 });
		expect(body).toHaveProperty("report", {
			nOgNn: {
				count: 1,
				name: "n og nn",
			},
		});
		done();
	});

	it("GET /api/v1/exercises/:id sends 404 with incorrect Id", async (done) => {
		const token = app.get("testToken");
		const { status } = await request(app)
			.get("/api/v1/exercises/" + "5eb9721de76922235deb5b5a")
			.set({ Authorization: `Bearer ${token}` });
		expect(status).toEqual(404);
		done();
	});

	it("POST /api/v1/exercises/complete/ requires auth", async (done) => {
		const { status } = await request(app).get(
			"/api/v1/exercises/complete/"
		);
		expect(status).toEqual(401);
		done();
	});

	it("POST /api/v1/exercises/complete/ responds with 400 on bad request", async (done) => {
		const token = app.get("testToken");
		const { status } = await request(app)
			.post("/api/v1/exercises/complete/")
			.set({ Authorization: `Bearer ${token}` });
		expect(status).toEqual(400);
		done();
	});

	it("POST /api/v1/exercises/complete/ responds with 200 and practice data on success", async (done) => {
		const token = app.get("testToken");

		const exerciseId = app.get("exerciseId");
		const { status } = await request(app)
			.post("/api/v1/exercises/complete/")
			.send({
				exercise: exerciseId,
				exerciseString: "this is part one",
				errorItems: [],
				duration: 10,
			})
			.set({ Authorization: `Bearer ${token}` });
		expect(status).toEqual(201);
		done();
	});
});
