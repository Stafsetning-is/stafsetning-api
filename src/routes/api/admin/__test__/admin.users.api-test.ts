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
		console.log(`/api/admin/users/${app.get("userId")}/make_admin`);
		const { status } = await request(app)
			.post(`/api/admin/users/${app.get("userId")}/make_admin`)
			.set({ Authorization: `Bearer ${token}` });
		expect(status).toEqual(200);
		done();
	});
});
