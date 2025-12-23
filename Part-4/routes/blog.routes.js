const {
  getBlogs,
  createBlogs,
  removeBlog,
} = require("../controllers/blog.controller");
const blogRouter = require("express").Router();

blogRouter.get("/", getBlogs);
blogRouter.post("/", createBlogs);
blogRouter.delete("/:id", removeBlog);

module.exports = blogRouter;
