const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  email: String,
  password: String,
  passwordConfirmation: String,
  firstName: String,
  lastName: String,
  dob: String,
  // dob: { $dateToString: { format: "%Y-%m-%d" } },
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