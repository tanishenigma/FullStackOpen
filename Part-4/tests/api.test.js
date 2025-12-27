// const mongoose = require("mongoose");
// const assert = require("node:assert");

// const { test, after, beforeEach } = require("node:test");
// const supertest = require("supertest");
// const Blog = require("../models/blog.model");
// const app = require("../app");

// const api = supertest(app);

// const initialBlogs = [
//   {
//     title: "React patterns",
//     author: "Michael Chan",
//     content: "A deep dive into React.",
//     meta: {
//       likes: 7,
//       bookmarks: 1,
//     },
//   },
//   {
//     title: "Canonical string reduction",
//     author: "Edsger W. Dijkstra",
//     content: "Algorithm logic explained.",
//     meta: {
//       likes: 12,
//       bookmarks: 4,
//     },
//   },
// ];

// beforeEach(async () => {
//   await Blog.deleteMany({});
//   for (const blog of initialBlogs) {
//     let blogObject = new Blog(blog);
//     await blogObject.save();
//   }
// });

// test("Likes are 0", async () => {
//   const newBlog = {
//     title: "Subtle way of living",
//     author: "Tanish Sharma",
//     content: "You don't know how to live the life.",
//   };
//   const response = await api
//     .post("/api/blogs")
//     .send(newBlog)
//     .expect(201)
//     .expect("Content-Type", /application\/json/);

//   assert.strictEqual(response.body.meta.likes, 0);
// });

// after(async () => {
//   await mongoose.connection.close();
// });
