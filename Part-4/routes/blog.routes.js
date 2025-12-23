const {
  getBlogs,
  createBlogs,
  removeBlog,
  updateBlog,
} = require("../controllers/blog.controller");
const blogRouter = require("express").Router();

blogRouter.get("/", getBlogs);
blogRouter.post("/", createBlogs);
blogRouter.delete("/:id", removeBlog);
blogRouter.put("/:id", updateBlog);

module.exports = blogRouter;
