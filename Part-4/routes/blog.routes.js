const {
  getBlogs,
  createBlogs,
  removeBlog,
  updateBlog,
} = require("../controllers/blog.controller");
const blogRouter = require("express").Router();
const { tokenExtractor, userExtractor } = require("../utils/middleware");

blogRouter.use(tokenExtractor);

blogRouter.get("/", getBlogs);
blogRouter.get("/:id", getBlogs);
blogRouter.post("/", userExtractor, createBlogs);
blogRouter.delete("/:id", userExtractor, removeBlog);
blogRouter.put("/:id", userExtractor, updateBlog);

module.exports = blogRouter;
