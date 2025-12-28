const User = require("../models/user.model");
const bcrypt = require("bcrypt");

const getUser = async (req, res, next) => {
  try {
    const getUsers = await User.find({}).populate("blogs");
    res.send(getUsers);
  } catch (err) {
    next(err);
  }
};
const createUser = async (req, res, next) => {
  const { username, email, password } = req.body;
  if (!password || password.length < 8) {
    return res.status(400).json({
      error: "Password must be at least 8 characters long",
    });
  }
  try {
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);
    const newUser = new User({
      username,
      email,
      passwordHash,
    });
    const savedUser = await newUser.save();
    res.status(201).json({ message: "User Created Successfully!" });
    res.send(savedUser);
  } catch (error) {
    next(error);
  }
};

module.exports = { getUser, createUser };
