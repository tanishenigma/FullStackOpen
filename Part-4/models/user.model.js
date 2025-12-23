const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String },
  blogs: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Blog",
  },
});

const User = mongoose.model("User", userSchema);
module.exports = User;
