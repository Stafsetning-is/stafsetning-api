import request from "supertest";
import app from "../../../../app";

describe("User routes", () => {
	it("POST /api/admin/users/:uid/make_admin requires auth", async (done) => {
		const { status } = await request(app).post(
			`/api/admin/users/${app.get("userId")}/make_admin`
		);
		expect(status).toEqual(401);
		done();
	});

	it("POST /api/admin/users/:uid/make_admin does work with admin token", async (done) => {
		const token = app.get("testToken");
		const { status } = await request(app)
			.post(`/api/admin/users/${app.get("userId")}/make_admin`)
			.set({ Authorization: `Bearer ${token}` });
		expect(status).toEqual(401);
		done();
	});

	it("POST /api/admin/users/:uid/make_admin does work with admin token", async (done) => {
		const token = app.get("adminTestToken");
		const { status } = await request(app)
			.post(`/api/admin/users/${app.get("userId")}/make_admin`)
			.set({ Authorization: `Bearer ${token}` });
		expect(status).toEqual(200);
		done();
	});

	it("POST /api/admin/users/:uid/make_admin responds with 400 if user does not exist", async (done) => {
		const token = app.get("adminTestToken");
		const { status } = await request(app)
			.post("/api/admin/users/5e9b4f803b31c29f0224f8ad/make_admin")
			.set({ Authorization: `Bearer ${token}` });
		expect(status).toEqual(400);
		done();
	});

	it("GET /api/admin/users/invite_list responds with 401 without admin token", async (done) => {
		const { status } = await request(app).get(
			"/api/admin/users/invite_list"
		);
		expect(status).toEqual(401);
		done();
	});

	it("GET /api/admin/users/invite_list responds with 200 and array as body", async (done) => {
		const token = app.get("adminTestToken");
		const { status, body } = await request(app)
			.get("/api/admin/users/invite_list")
			.set({ Authorization: `Bearer ${token}` });
		expect(status).toEqual(200);
		expect(Array.isArray(body)).toBe(true);
		done();
	});

	it("GET /api/admin/users/exercises responds with 401 without admin token", async (done) => {
		const { status } = await request(app).get(
			"/api/admin/users/invite_list"
		);
		expect(status).toEqual(401);
		done();
	});

	it("GET /api/admin/users/exercises responds with 200 and array as body", async (done) => {
		const token = app.get("adminTestToken");
		const { status, body } = await request(app)
			.get("/api/admin/users/exercises")
			.set({ Authorization: `Bearer ${token}` });
		expect(status).toEqual(200);
		expect(Array.isArray(body)).toBe(true);
		done();
	});
});
