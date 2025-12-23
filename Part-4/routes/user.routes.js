const { createUser, getUser } = require("../controllers/user.controller");
const userRouter = require("express").Router();

userRouter.get("/", getUser);
userRouter.post("/", createUser);
module.exports = userRouter;
