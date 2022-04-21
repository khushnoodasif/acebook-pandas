const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  message: String,
  createdAt: {
    type: Date,
    default: new Date()
  },
  user_id: String,
  likes: Array
});

const Post = mongoose.model("Post", PostSchema);

module.exports = Post;