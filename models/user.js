const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  email: String,
  password: String,
  passwordCheck: String,
  firstName: String,
  lastName: String,
  dob: String,
  profilePictureURL: String,
  bio: String,
  location: String,
  hobbie: String,
  favShow: String,
  favMovie: String,
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