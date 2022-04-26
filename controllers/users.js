const User = require("../models/user");

const UsersController = {
  Index: (req, res) => {
    User.find((err, users) => {
      if (err) {
        throw err;
      }
      res.render("users/index", {
        users: users,
        currentUser: req.session.user,
      });
    });
  },

  New: (req, res) => {
    res.render("users/new", {});
  },

  Profile: (req, res) => {
    res.render("users/profile", {
      user: req.session.user,
    });
  },

  Create: (req, res) => {
    const user = new User(req.body);
    user.save((err) => {
      if (err) {
        throw err;
      }
      res.status(201).redirect("/posts");
    });
  },

  RequestFriend: (req, res) => {

    //find a user by req.body.id and add it to the req.session.user friendRequests array
    User.findById(req.body.id, (err, user) => {
      if (err) {
        throw err;
      }
      req.session.user.friendRequests.push(user);
      User.updateOne({ _id: req.session.user._id }, { $addToSet: { friendRequests: user } }, (err) => {
        if (err) {
          throw err;
        }
      })
      res.redirect("/users");
    })
  },

  Remove: (req, res) => {
    res.render("users/delete", {
      user: req.session.user,
    });
  },

  Update: (req, res) => {
    User.findByIdAndUpdate(req.session.user._id, req.body, (err) => {
      if (err) {
        throw err;
      }
      res.redirect("/users/profile");
    });
  },

  Delete: (req, res) => {
    User.findByIdAndDelete(req.session.user._id, (err, user) => {
      if (err) {
        throw err;
      }
      res.redirect("/users/delete");
    });
  },
};

module.exports = UsersController;
