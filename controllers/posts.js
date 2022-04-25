const Post = require("../models/post");

const PostsController = {
  Index: (req, res) => {
    Post.find((err, posts) => {
      if (err) {
        throw err;
      }

      res.render("posts/index", {
        posts: posts.reverse(),
        user: req.session.user
      });
    });
  },
  New: (req, res) => {
    res.render("posts/new", { user: req.session.user });
  },

  Like: (req, res) => {
    Post.updateOne({ _id: req.body.post }, { $addToSet: { likes: req.session.user } }, (err) => {
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

  addComment: (req, res) => {
    Post.updateOne({ _id: req.body.post }, { $push: { comments: { message: req.body.comment } } }, (err) => {
      if (err) {
        throw err;
      }
      console.log('req body: ', req.body.comment)
      console.log('req body post: ', req.body.post)
      console.log('req.session.user.firstName: ', req.session.user.firstName)
      res.status(201).redirect("/posts");
    })
  }
};

module.exports = PostsController;
