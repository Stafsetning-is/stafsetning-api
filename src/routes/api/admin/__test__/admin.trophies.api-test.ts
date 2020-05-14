import request from "supertest";
import app from "../../../../app";

describe("Exercises routes", () => {
	it("POST /api/admin/trophies responds with 401 withot admin token", async (done) => {
		const { status } = await request(app).post("/api/admin/trophies");
		expect(status).toEqual(401);
		done();
	});

	it("POST /api/admin/trophies responds with 400 with invalid body", async (done) => {
		const token = app.get("adminTestToken");
		const { status } = await request(app)
			.post("/api/admin/trophies")
			.set({ Authorization: `Bearer ${token}` });
		expect(status).toEqual(400);
		done();
	});

	it("POST /api/admin/trophies responds with 201 and correct body", async (done) => {
		const token = app.get("adminTestToken");
		const { status, body } = await request(app)
			.post("/api/admin/trophies")
			.send({
				rules: [],
				title: "abcd123",
				description: "some string",
				icon: "faTrophy",
			})
			.set({ Authorization: `Bearer ${token}` });
		expect(status).toEqual(201);
		expect(body.rules.length).toEqual(0);
		expect(body).toHaveProperty("title", "abcd123");
		expect(body).toHaveProperty("description", "some string");
		done();
	});
});
