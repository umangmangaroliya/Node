import mongoose from "mongoose";
import request from "supertest";
import app from "../app.js";

beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URI);
});

afterAll(async () => {
  await mongoose.connection.db.dropDatabase();
  await mongoose.disconnect();
});

describe("User Register API", () => {
  it("should register a user", async () => {
    const res = await request(app).post("/api/users/register").send({
      name: "Test User",
      email: "test@example.com",
      password: "test1234",
    });

    expect(res.statusCode).toBe(201);
    expect(res.body.user.email).toBe("test@example.com");
  });
});
