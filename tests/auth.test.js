const request = require("supertest");
const server = require("../index");
const mongoose = require('mongoose'); // Assuming your Express app is exported from index.js
const agent = request.agent(server);

describe("Authentication endpoints", () => {
  it("should signup a new user", async () => {
    const res = await agent.post("/api/auth/signup").send({
      username: "bisrat",
      email: "bisratmelak@gmail.com",
      password: "testpassword",
      role: "admin",
    });

    expect(res.statusCode).toEqual(201);
    expect(res.body.message).toEqual("User created successfully");
  });

  it("should login an existing user", async () => {
    const res = await agent.post("/api/auth/login").send({
      email: "testps@example.com",
      password: "password123",
    });

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("token");
  });
});
afterAll(async () => {
  // Close the database connection here
  await mongoose.connection.close();
});
