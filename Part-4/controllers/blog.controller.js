const Blog = require("../models/blog.model");
const middleware = require("../utils/middleware");

const getBlogs = async (req, res, next) => {
  try {
    const blogs = await Blog.find({});
    res.json(blogs);
  } catch (error) {
    next(error);
  }
};

const createBlogs = async (req, res, next) => {
  const body = req.body;
  try {
    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
    });

    const savedBlog = await blog.save();
    res.status(201).json(savedBlog);
  } catch (error) {
    next(error);
  }
};

const removeBlog = async (req, res, next) => {
  try {
    await Blog.findByIdAndDelete(req.params.id);
    res.status(204).end();
  } catch (error) {
    next(error);
  }
};

const updateBlog = async (req, res, next) => {
  const body = req.body;
  const blogData = {
    title: body.title,
    url: body.url,
  };
  try {
    const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, blog, {
      new: true,
    });
    res.json(updatedBlog);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getBlogs,
  createBlogs,
  removeBlog,
  updateBlog,
};
