const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  email: String,
  password: String,
  passwordCheck: String,
  firstName: String,
  lastName: String,
  profilePictureURL: String,
  friendRequests: [{
    type: mongoose.Schema.Types.Object,
    ref: "User",
  }],
  friends: [{
    type: mongoose.Schema.Types.Object,
    ref: "User",
  }],
});

const User = mongoose.model("User", UserSchema);

module.exports = User;