import request from "supertest";
import app from "../../../../app";

describe("Trophies routes", () => {
	it("POST /api/admin/rules responds with 401 withot admin token", async (done) => {
		const { status } = await request(app).post("/api/admin/rules");
		expect(status).toEqual(401);
		done();
	});

	it("POST /api/admin/rules responds with 400 with invalid body", async (done) => {
		const token = app.get("adminTestToken");
		const { status } = await request(app)
			.post("/api/admin/rules")
			.set({ Authorization: `Bearer ${token}` });
		expect(status).toEqual(400);
		done();
	});

	it("POST /api/admin/rules responds with 201 and correct body", async (done) => {
		const token = app.get("adminTestToken");
		const { status } = await request(app)
			.post("/api/admin/rules")
			.send({
				accessor: "key",
				comparison: "gt",
				value: 4,
			})
			.set({ Authorization: `Bearer ${token}` });
		expect(status).toEqual(201);
		done();
	});
});
