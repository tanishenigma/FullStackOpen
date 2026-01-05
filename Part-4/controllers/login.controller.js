const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/user.model");
require("dotenv").config();
const login = async (req, res) => {
  const { username, email, password } = req.body;

  const user = await User.findOne({
    $or: [{ username: username }, { email: email }],
  });
  const passwordCorrect =
    user === null ? false : await bcrypt.compare(password, user.passwordHash);

  if (!(user && passwordCorrect)) {
    return res.status(401).json({
      error: "Invalid Username or Password",
    });
  }

  const userForToken = {
    username: user.username,
    id: user._id,
  };
  const token = jwt.sign(userForToken, process.env.SECRET, {
    expiresIn: 60 * 60,
  });

  res
    .status(200)
    .send({
      token,
      username: user.username,
      name: user.name,
      email: user.email,
    });
};
module.exports = login;
