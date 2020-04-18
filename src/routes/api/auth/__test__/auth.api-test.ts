import request from "supertest";
import app from "../../../../app";

describe("Authentication routes", () => {
	it("POST /api/auth/sign_up success", async (done) => {
		const payload = {
			name: "John Doe",
			password: "Password12.3",
			mobile: "8012936",
			type: "user",
			username: "johnyd2",
			difficulty: 5,
		};
		const { body, status } = await request(app)
			.post("/api/auth/sign_up")
			.send(payload);
		expect(body).toHaveProperty("token");
		expect(body).toHaveProperty("user");
		expect(status).toEqual(201);
		done();
	});

	it("POST /api/auth/sign_up fail", async (done) => {
		const payload = {
			name: "Pope John Paul II",
			password: "Password12.3",
			mobile: "5812345",
			type: "user",
			username: "paulyp",
			difficulty: 5,
		};
		const { status } = await request(app)
			.post("/api/auth/sign_up")
			.send(payload);
		expect(status).toEqual(400);
		done();
	});

	it("POST /api/auth/log_in success", async (done) => {
		const payload = {
			password: "Password12.3",
			username: "paulyp",
		};
		const { body, status } = await request(app)
			.post("/api/auth/log_in")
			.send(payload);
		expect(body).toHaveProperty("token");
		expect(body).toHaveProperty("user");
		expect(status).toEqual(200);
		done();
	});

	it("POST /api/auth/log_in failure", async (done) => {
		const payload = {
			password: "Password12a.3",
			username: "paulyp",
		};
		const { status } = await request(app)
			.post("/api/auth/log_in")
			.send(payload);
		expect(status).toEqual(400);
		done();
	});
});
