const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  title: String,
  message: String,
  imageURL: String,
  timestamp: Date,
  user_id: String,
  firstName: String,
  lastName: String,
  profilePictureURL: String,
  likes: Array,
  comments: Array
});

const Post = mongoose.model("Post", PostSchema);

module.exports = Post;