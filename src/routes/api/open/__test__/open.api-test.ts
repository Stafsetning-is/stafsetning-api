import request from "supertest";
import app from "../../../../app";

describe("Open Routes", () => {
    it("GET /api/open/exercise_sample/", async (done) => {
        const { body, status } = await request(app).get(
            "/api/open/exercise_sample/"
        );
        expect(status).toEqual(200);
        expect(body).toBeInstanceOf(Array);
        done();
    });
});
