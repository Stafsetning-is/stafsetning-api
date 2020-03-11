import request from "supertest";
import app from "../src/app";

describe("GET /status", () => {
    it("should return 404", (done) => {
        request(app).get("/status")
            .expect(200, done);
    });
});

describe("testing CI", () => {
    it("should work", () => {
        expect(5).toEqual(5);
    });
});