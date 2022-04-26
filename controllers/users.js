const { db } = require("../models/user");
const User = require("../models/user");

const UsersController = {
  New: (req, res) => {
    res.render("users/new", {});
  },

  Profile: (req, res) => {
    res.render("users/profile", {
      user: req.session.user,
    });
  },

  Create: (req, res) => {
    const newUser = new User(req.body);
    

    User.findOne({ email: req.body.email }, (err, existingUser) => {
      if (err) {
        throw err;
      }
      if (existingUser) {
        console.log("error", "Account with that email address already exists");
        return res.redirect("/users/new");
      }
          if (newUser.email == "") {
            res.redirect("/users/new");
          } 
          else if (newUser.password == "") {
            res.redirect("/users/new");
          } else {
            newUser.save((err) => {
              if (err) {
                throw err;
              }
              res.status(201).redirect("/posts");
            })
          }
        })
  },

  Remove: (req, res) => {
    res.render("users/delete", {
      user: req.session.user,
    });
  },

  Update: (req, res) => {
    User.findByIdAndUpdate(req.session.user._id, req.body, (err, user) => {
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
