const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, unique: true },
  passwordHash: { type: String, minlength: 8 },
  blogs: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Blog",
  },
});

userSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject.passwordHash;
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

const User = mongoose.model("User", userSchema);
module.exports = User;
