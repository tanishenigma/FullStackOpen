const config = require("./utils/config");
const express = require("express");
const mongoose = require("mongoose");
const userRouter = require("./routes/user.routes");
const blogRouter = require("./routes/blog.routes");
const app = express();

mongoose
  .connect(config.MONGODB_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.error("MongoDB error:", error.message));

app.use(express.json());
app.use("/api/users", userRouter);
app.use("/api/blogs", blogRouter);

module.exports = app;
