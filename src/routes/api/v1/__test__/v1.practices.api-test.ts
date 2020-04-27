import request from "supertest";
import app from "../../../../app";

describe("Practice Routes V1", () => {
	it("GET /api/v1/practices requires auth", async (done) => {
		const { status } = await request(app).get("/api/v1/practices");
		expect(status).toEqual(401);
		done();
	});

	it("GET /api/v1/practices response with 200 with correct authentication", async (done) => {
		const token = app.get("testToken");
		const { body, status } = await request(app)
			.get("/api/v1/practices")
			.set({ Authorization: `Bearer ${token}` });
		expect(status).toEqual(200);
		const isArray = Array.isArray(body);
		expect(isArray).toBe(true);
		done();
	});

	it("GET /api/v1/practices/:id/proverb response with 200 with correct authentication", async (done) => {
		const token = app.get("testToken");
		const { body } = await request(app)
			.get("/api/v1/practices")
			.set({ Authorization: `Bearer ${token}` });
		const practiceID = body[0].practice;
		const { status } = await request(app)
			.get(`/api/v1/practices/${practiceID}/proverb`)
			.set({ Authorization: `Bearer ${token}` });
		expect(status).toEqual(200);
		done();
	});

	it("POST /api/v1/exercises/complete success case", async (done) => {
		const token = app.get("testToken");
		const practice = {
			"errorItems": [
				{
					"error": "i",
					"charAt": 10
				},
				{
					"error": " ",
					"charAt": 37
				},
				{
					"error": " ",
					"charAt": 57
				}
			],
			"exerciseString": "Kalli for ut i bud til ad kaupa mjolk, handa mommu sinni.",
			"duration": 69,
			"exercise": "5e6b67a89c03d049cb2b9943"
		};
		const { body, status } = await request(app)
			.post("/api/v1/exercises/complete")
			.set({ Authorization: `Bearer ${token}` })
			.send(practice)
		expect(status).toEqual(201);
		expect(Object.keys(body).length).toEqual(9);
		expect(body).toHaveProperty("_id");
		expect(body).toHaveProperty("errorItems");
		expect(Object.keys(body.errorItems).length).toEqual(3);
		expect(body.errorItems[0]).toHaveProperty("error");
		expect(body.errorItems[0]).toHaveProperty("charAt");
		expect(body).toHaveProperty("exerciseString", "Kalli for ut i bud til ad kaupa mjolk, handa mommu sinni.");
		expect(body).toHaveProperty("duration", 69);
		expect(body).toHaveProperty("exercise");
		expect(body).toHaveProperty("user");
		done();
	});

	it("POST /api/v1/exercise/complete failure case", async (done) => {
		const token = app.get("testToken");
		const practice = {
			"errorItems": [
				{
					"error": "i",
					"charAt": 10
				},
				{
					"error": " ",
					"charAt": 37
				},
				{
					"error": " ",
					"charAt": 57
				}
			],
			"exercise": "5e6b67a89c03d049cb2b9943"
		};
		const { status } = await request(app)
			.post("/api/v1/exercises/complete")
			.set({ Authorization: `Bearer ${token}` })
			.send(practice);
		expect(status).toEqual(400);
		done();
	});

	/**
	 * Vantar
	 *
	 * [ ] fail og success a get by id
	 */
});
