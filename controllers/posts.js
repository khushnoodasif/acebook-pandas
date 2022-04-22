const Post = require("../models/post");

const PostsController = {
  Index: (req, res) => {
    Post.find((err, posts) => {
      if (err) {
        throw err;
      }

      res.render("posts/index", {
        posts: posts.reverse(),
        user: req.session.user,
      });
    });
  },
  New: (req, res) => {
    res.render("posts/new", { user: req.session.user });
  },

  Like: (req, res) => {
    Post.updateOne({ _id: req.body.post }, { $push: { likes: "1" } }, (err) => {
      if (err) {
        throw err;
      }
      res.status(201).redirect("/posts");
    });
  },

  Create: (req, res) => {
    const post = new Post(req.body);
    post.save((err) => {
      if (err) {
        throw err;
      }

      res.status(201).redirect("/posts");
    });
  },

  Like: (req, res) => {
    Post.findByIdAndUpdate(req.params.id, { $inc: { likes: 1 } }, (err, post) => {
      if (err) {
        throw err;
      }

      res.redirect("/posts");
    });
  }
};

module.exports = PostsController;
