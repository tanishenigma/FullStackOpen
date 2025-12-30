const mongoose = require("mongoose");
const supertest = require("supertest");
const assert = require("node:assert");
const app = require("../app");
const { test, after, beforeEach } = require("node:test");
const api = supertest(app);

test.only("Invalid Users are not Created", async () => {
  const newUser = {
    username: "Ta",
    email: "harekrsna@gmail.com",
    password: "23",
  };

  const response = await api
    .post("/api/users")
    .send(newUser)
    .expect(400)
    .expect("Content-Type", /application\/json/);
});

after(async () => {
  await mongoose.connection.close();
});
