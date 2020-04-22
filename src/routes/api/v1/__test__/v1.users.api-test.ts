import request from "supertest";
import app from "../../../../app";

describe("Auth routes", () => {
    it("GET /api/v1/users/auth requires token", async (done) => {
        const { status } = await request(app).get("/api/v1/users/auth");
        expect(status).toEqual(401);
        done();
    });

    it("GET /api/v1/users/auth responds with 200 with correct token", async (done) => {
        const token = app.get("testToken");
        const { body, status } = await request(app)
            .get("/api/v1/users/auth")
            .set({ Authorization: `Bearer ${token}` });
        expect(status).toEqual(200);
        done();
    });

    it("GET /api/v1/users/auth responds with 200 with correct token", async (done) => {
        const token = app.get("testToken");
        const { body } = await request(app)
            .get("/api/v1/users/auth")
            .set({ Authorization: `Bearer ${token}` });
        expect(body).toHaveProperty("_id");
        expect(body).toHaveProperty("name");
        expect(body).toHaveProperty("type");
        done();
    });

    // it("POST /api/v1/users/change_difficulty responds with 200 with correct token", async (done) => {
    //     const token = app.get("testToken");
    //     let userDiff = { difficulty: 5 };
    //     const { body, status } = await request(app)
    //         .post("/api/v1/users/change_difficulty")
    //         .send(userDiff)
    //         .set({ Authorization: `Bearer ${token}` });
    //     expect(body).toHaveProperty("difficulty");
    //     expect(status).toEqual(200);
    //     done();
    // });

    // it("POST /api/v1/users/change_difficulty should not allow difficulty zero", async (done) => {
    //     const token = app.get("testToken");
    //     let userDiff = { difficulty: 0 };
    //     const { body, status } = await request(app)
    //         .post("/api/v1/users/change_difficulty")
    //         .send(userDiff)
    //         .set({ Authorization: `Bearer ${token}` });
    //     // expect(body).toHaveProperty("difficulty");
    //     expect(body).toEqual(400);
    //     done();
    // });
});
