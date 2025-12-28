const Blog = require("../models/blog.model");
const User = require("../models/user.model");

const getBlogs = async (req, res, next) => {
  try {
    const blogs = await Blog.find({}).populate("user", {
      username: 1,
      name: 1,
    });
    res.json(blogs);
  } catch (error) {
    next(error);
  }
};

const createBlogs = async (req, res, next) => {
  const body = req.body;
  const user = await User.findById(body.userId);

  if (!user) {
    return res.status(400).json({ error: "userId missing or not valid" });
  }

  try {
    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      user: user._id,
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
