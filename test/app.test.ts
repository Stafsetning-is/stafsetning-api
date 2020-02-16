import request from "supertest";
import app from "../src/app";

describe("GET /random-url", () => {
    it("should return 404", (done) => {
        request(app).get("/reset")
            .expect(404, done);
    });
});

describe("testing CI", () => {
    it("should not work", () => {
        expect(5).toEqual(3);
    })
})