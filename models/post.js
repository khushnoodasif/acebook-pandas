const mongoose = require("mongoose");

const date = new Date
var dateFormat = date.toDateString()

// const commentSchema = new mongoose.Schema({
//     message: String,
//     timestamp: { type: Date, default: new Date() },
//     createdAt: { type: Date, default: dateFormat },
//     user_id: String,
//     firstName: String,
//     lastName: String,
//     profilePictureURL: String,
//     likes: Array
// });

const PostSchema = new mongoose.Schema({
  message: String,
  timestamp: { type: Date, default: new Date() },
  createdAt: {
    type: String,
    default: dateFormat
  },
  user_id: String,
  firstName: String,
  lastName: String,
  profilePictureURL: String,
  likes: Array,
  comments: Array
});

const Post = mongoose.model("Post", PostSchema);

module.exports = Post;