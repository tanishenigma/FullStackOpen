const mongoose = require("mongoose");
require("dotenv").config();

const url = process.env.TEST_MONGODB_URI;

mongoose.set("strictQuery", false);
mongoose.connect(url);

const blogSchema = new mongoose.Schema({
  title: String,
  author: String,
  content: String,
});

const Blog = mongoose.model("Blog", blogSchema);

const blog = new Blog({
  title: "Why HTML is easy",
  author: "Edsger W. Dijkstra",
  url: "HTML is easy because it is markup, not logic.",
});

blog.save().then(() => {
  console.log("blog saved!");
  mongoose.connection.close();
});

Blog.find({}).then((result) => {
  result.forEach((blog) => {
    console.log(blog);
  });
  mongoose.connection.close();
});
