const mongoose = require("mongoose");

const FriendSchema = new mongoose.Schema({
  id: String,
  email: String,
  firstName: String,
  lastName: String,
  profilePictureURL: String
});

const Friend = mongoose.model("Friend", FriendSchema);

module.exports = Friend;