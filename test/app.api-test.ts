import request from "supertest";
import app from "../src/app";

describe("GET /status", () => {
    it("should return 404", (done) => {
        request(app).get("/status")
            .expect(404, done);
    });
});

describe("api/v1", () => {
    it("POST /api/v1/exercises/ returns 201 on successful post", (done) => {
        request(app).post("/api/v1/exercises/")
            .send({
                difficultRange: {
                    min: 5,
                    max: 10
                },
                text: "Kalli for ut i bud;;;"
            })
            .expect(201, done);
    });

    it("POST /api/v1/exercises/ returns 400 on unsuccessful post", (done) => {
        request(app).post("/api/v1/exercises/")
            .send({
                text: "Kalli for ut i bud;;;"
            })
            .expect(400, done);
    });
});
