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
//     url: "A deep dive into React.",
//   },
//   {
//     title: "Canonical string reduction",
//     author: "Edsger W. Dijkstra",
//     url: "Algorithm logic explained.",
//   },
// ];

// beforeEach(async () => {
//   await Blog.deleteMany({});

//   for (const blog of initialBlogs) {
//     let blogObject = new Blog(blog);
//     await blogObject.save();
//   }
// });

// test("title property missing from the request data", async () => {
//   const newBlog = {
//     //title: "title",
//     author: "Tanish",
//     url: "tanishdawg.vercel.app",
//   };
//   const response = await api
//     .post("/api/blogs")
//     .send(newBlog)
//     .expect(400)
//     .expect("Content-Type", /application\/json/);

//   assert.strictEqual(response.statusCode, 400, "Status Code must be 400");
// });

// test("url property is missing from the request data", async () => {
//   const newBlog = {
//     title: "title",
//     author: "Tanish",
//     //url: "tanishdawg.vercel.app",
//   };

//   const response = await api
//     .post("/api/blogs")
//     .send(newBlog)
//     .expect(400)
//     .expect("Content-Type", /application\/json/);

//   assert.strictEqual(response.statusCode, 400, "Status Code must be 400");
// });

// after(async () => {
//   await mongoose.connection.close();
// });
