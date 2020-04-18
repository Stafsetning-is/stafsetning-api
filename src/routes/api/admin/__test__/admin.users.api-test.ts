import request from "supertest";
import app from "../../../../app";

describe("User routes", () => {
	it(`GET /api/admin/users/${app.get(
		"userId"
	)}/make_admin requires auth`, async (done) => {
		const { status } = await request(app).get(
			"/api/admin/users/:uid/make_admin"
		);
		expect(status).toEqual(401);
		done();
	});

	it(`GET /api/admin/users/${app.get(
		"userId"
	)}/make_admin requires does not accept user tokens`, async (done) => {
		const token = app.get("testToken");
		const { status } = await request(app)
			.get("/api/admin/users/:uid/make_admin")
			.set({ Authorization: `Bearer ${token}` });
		expect(status).toEqual(401);
		done();
	});

	it(`GET /api/admin/users/${app.get(
		"userId"
	)}/make_admin does work with admin token`, async (done) => {
		const token = app.get("adminTestToken");
		const { status } = await request(app)
			.get("/api/admin/users/:uid/make_admin")
			.set({ Authorization: `Bearer ${token}` });
		expect(status).toEqual(200);
		done();
	});
});
