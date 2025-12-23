const User = require("../models/user.model");

const getUser = async (req, res, next) => {
  try {
    const getUsers = await User.find({}).populate("blogs");
    res.send(getUsers);
  } catch (err) {
    next(err);
  }
};
const createUser = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    const newUser = new User({
      username,
      email,
      password,
    });
    const savedUser = await newUser.save();
    res.send(savedUser);
    res.status(201).json({ message: "User Created Successfully!" });
  } catch (error) {
    next(error);
  }
};

module.exports = { getUser, createUser };
