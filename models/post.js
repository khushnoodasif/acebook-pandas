const mongoose = require("mongoose");

const date = new Date
var dateFormat = date.toDateString()

const PostSchema = new mongoose.Schema({
  title: String,
  message: String,
  imageURL: String,
  createdAt: {
    type: String,
    default: dateFormat
  },
  user_id: String,
  firstName: String,
  lastName: String,
  profilePictureURL: String,
  likes: Array
});

const Post = mongoose.model("Post", PostSchema);

module.exports = Post;