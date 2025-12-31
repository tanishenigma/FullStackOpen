const mongoose = require("mongoose");
const assert = require("node:assert");
const bcrypt = require("bcrypt");

const { test, after, beforeEach } = require("node:test");
const supertest = require("supertest");
const Blog = require("../models/blog.model");
const User = require("../models/user.model");
const app = require("../app");

const api = supertest(app);

const initialBlogs = [
  {
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
  },
  {
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "https://cs.utexas.edu/",
  },
];

let token = null;

beforeEach(async () => {
  await Blog.deleteMany({});
  await User.deleteMany({});

  // Create a test user
  const passwordHash = await bcrypt.hash("testpassword", 10);
  const user = new User({ username: "testuser", passwordHash });
  await user.save();

  // Login to get token
  const loginResponse = await api
    .post("/api/login")
    .send({ username: "testuser", password: "testpassword" });

  token = loginResponse.body.token;

  // Create initial blogs with the test user
  for (const blog of initialBlogs) {
    let blogObject = new Blog({ ...blog, user: user._id });
    await blogObject.save();
  }
});

test("a valid blog can be added with token", async () => {
  const newBlog = {
    title: "Subtle way of living",
    author: "Tanish Sharma",
    url: "https://tanishdawg.vercel.app",
  };

  await api
    .post("/api/blogs")
    .set("Authorization", `Bearer ${token}`)
    .send(newBlog)
    .expect(201)
    .expect("Content-Type", /application\/json/);

  const response = await api.get("/api/blogs");

  const titles = response.body.map((r) => r.title);

  assert.strictEqual(response.body.length, initialBlogs.length + 1);

  assert(titles.includes("Subtle way of living"));
});

test("adding a blog fails with 401 if token is not provided", async () => {
  const newBlog = {
    title: "Unauthorized blog",
    author: "Anonymous",
    url: "https://example.com",
  };

  const response = await api
    .post("/api/blogs")
    .send(newBlog)
    .expect(401)
    .expect("Content-Type", /application\/json/);

  assert.strictEqual(response.body.error, "token missing");

  // Verify blog was not added
  const blogsAtEnd = await api.get("/api/blogs");
  assert.strictEqual(blogsAtEnd.body.length, initialBlogs.length);
});

test("fetching all blogs works without a token", async () => {
  const response = await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/);

  assert.strictEqual(response.body.length, initialBlogs.length);
});

after(async () => {
  await mongoose.connection.close();
});
