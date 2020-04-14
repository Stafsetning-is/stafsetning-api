import request from "supertest";
import app from "../src/app";

describe("Practice Routes V1", () => {
    it("GET /api/v1/practices requires auth", async (done) => {
        const { body, status } = await request(app).get("/api/v1/practices");
        expect(status).toEqual(401);
        done();
    });
});
