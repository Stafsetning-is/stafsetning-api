import request from "supertest";
import app from "../src/app";

describe("GET /random-url", () => {
    it("should return 404", (done) => {
        request(app).get("/reset")
            .expect(404, done);
    });
});

describe("testing CI", () => {
<<<<<<< HEAD:src/test/app.test.ts
    it("should work", () => {
        expect(5).toEqual(3);
=======
    it("should not work", () => {
        expect(6).toEqual(6);
>>>>>>> 9377201633c5c816ed130786e0fd0713a3c2e98d:src/test/app.unit-test.ts
    });
});