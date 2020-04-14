import request from "supertest";
import app from "../src/app";

describe("Practice Routes V1", () => {
    it("GET /api/v1/practices requires auth", async (done) => {
        const { body, status } = await request(app).get("/api/v1/practices");
        expect(status).toEqual(401);
        done();
    });

    it("GET /api/v1/practices response with 200 with correct authentication", async (done) => {
        const token = app.get("testToken");
        console.log(token);
        const { body, status } = await request(app)
            .get("/api/v1/practices")
            .set({ Authorization: `Bearer ${token}` });
        expect(status).toEqual(200);
        const isArray = Array.isArray(body);
        expect(isArray).toBe(true);
        done();
    });
});
