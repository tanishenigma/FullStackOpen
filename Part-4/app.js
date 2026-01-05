const express = require("express");
const mongoose = require("mongoose");
const config = require("./utils/config");
const cors = require("cors");
const middleware = require("./utils/middleware");
const userRouter = require("./routes/user.routes");
const blogRouter = require("./routes/blog.routes");
const loginRouter = require("./routes/login.routes");
const logger = require("./utils/logger");
const app = express();

mongoose
  .connect(config.MONGODB_URI)
  .then(() => logger.info("Connected to MongoDB"))
  .catch((error) => logger.error("MongoDB error:", error.message));

app.use(express.json());
app.use(middleware.requestLogger);
app.use(cors());

app.use("/api/users", userRouter);
app.use("/api/users/:id", userRouter);
app.use("/api/blogs", blogRouter);
app.use("/api/login", loginRouter);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);
module.exports = app;
