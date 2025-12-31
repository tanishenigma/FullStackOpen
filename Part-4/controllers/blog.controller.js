const Blog = require("../models/blog.model");
const User = require("../models/user.model");

const getBlogs = async (req, res, next) => {
  try {
    const blogs = await Blog.find({}).populate("user");
    res.json(blogs);
  } catch (error) {
    next(error);
  }
};

const createBlogs = async (req, res, next) => {
  const body = req.body;
  try {
    // get user from request object (set by userExtractor middleware)
    const user = req.user;

    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      user: user._id,
    });

    const savedBlog = await blog.save();
    user.blogs.push(savedBlog._id);
    await user.save();
    res.status(201).json(savedBlog);
  } catch (error) {
    next(error);
  }
};

const removeBlog = async (req, res, next) => {
  try {
    const user = req.user;
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({ error: "blog not found" });
    }

    if (blog.user.toString() !== user._id.toString()) {
      return res.status(403).json({ error: "only creator can delete blog" });
    }
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
    const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, blogData, {
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
