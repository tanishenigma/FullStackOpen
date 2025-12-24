const mongoose = require("mongoose");
const assert = require("node:assert");

const { test, after, beforeEach } = require("node:test");
const supertest = require("supertest");
const Blog = require("../models/blog.model");
const app = require("../app");

const api = supertest(app);

const initialBlogs = [
  {
    title: "React patterns",
    author: "Michael Chan",
    content: "A deep dive into React.",
    meta: {
      likes: 7,
      bookmarks: 1,
    },
  },
  {
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    content: "Algorithm logic explained.",
    meta: {
      likes: 12,
      bookmarks: 4,
    },
  },
];
beforeEach(async () => {
  await Blog.deleteMany({});
  for (const blog of initialBlogs) {
    let blogObject = new Blog(blog);
    await blogObject.save();
  }
});

// test("all blogs are returned", async () => {
//   const response = await api.get("/api/blogs");

//   assert.strictEqual(response.body.length, initialBlogs.length);
// });

// test("a specific blog title is within the returned blogs", async () => {
//   const response = await api.get("/api/blogs");

//   const titles = response.body.map((r) => r.title);
//   assert.strictEqual(titles.includes("React patterns"), true);
// });
test("a valid blog can be added ", async () => {
  const newBlog = {
    title: "Subtle way of living",
    author: "Tanish Sharma",
    content: "You don't know how to live the life.",
    meta: {
      likes: 7,
      bookmarks: 1,
    },
  };

  await api
    .post("/api/blogs")
    .send(newBlog)
    .expect(201)
    .expect("Content-Type", /application\/json/);

  const response = await api.get("/api/blogs");

  const contents = response.body.map((r) => r.content);

  assert.strictEqual(response.body.length, initialBlogs.length + 1);

  assert(contents.includes("You don't know how to live the life."));
});

after(async () => {
  await mongoose.connection.close();
});
