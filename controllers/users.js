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
        user: req.session.user
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
    const newUser = new User(req.body);
    

    User.findOne({ email: req.body.email }, (err, existingUser) => {
      if (err) {
        throw err;
      }
      if (existingUser) {
        req.flash("error", "Account with that email address already exists.");
        return res.redirect("/users/new");
      }
          if (newUser.email == "") {
            req.flash('error', 'Please enter an e-mail.');
            res.redirect("/users/new");
          } 
          else if (newUser.password == "") {
            req.flash('error', 'Please enter a password.')
            res.redirect("/users/new");
          }
          else if (newUser.firstName == "") {
            req.flash('error', 'Please enter a first name.')
            res.redirect("/users/new")
          } 
          else if (newUser.lastName == "") {
            req.flash('error', 'Please enter a last name.')
            res.redirect("/users/new")
          } 
          else if (newUser.dob == "") {
            req.flash('error', 'Please enter a date of birth.')
            res.redirect("/users/new")
          } 
          else {
            newUser.save((err) => {
              if (err) {
                throw err;
              }
              res.status(201).redirect("/posts");
            })
          }
        })
  },

  RequestFriend: (req, res) => {
    User.findById(req.body.id, (err, user) => {
      if (err) {
        throw err;
      }
      user.friendRequests.push(req.session.user);
      User.updateOne({ _id: user }, { $addToSet: { friendRequests: req.session.user } }, (err) => {
        if (err) {
          throw err;
        }
      })
      res.redirect("/users");
    })
  },

  DeclineRequestFriend: (req, res) => {
    User.findById(req.body.id, (err, user) => {
      const sessionUser = req.session.user;
      const { friendRequests } = sessionUser;
      const filteredSessionRequests = friendRequests.filter(request => { request._id == user._id} )

      sessionUser.friendRequests = filteredSessionRequests;

      User.findByIdAndUpdate( req.session.user._id, sessionUser, (err) => {
        if (err) { throw err }
        })
    res.redirect("/users/profile");
      }
    )
  },

  CreateFriend: (req, res) => {
    User.findById(req.body.id, (err, user) => {
      req.session.user.friends.push(user)

      for(var i = 0; i < req.session.user.friendRequests.length; i++) {
        if(req.session.user.friendRequests[i]._id == user._id) {
          req.session.user.friendRequests.splice(i, 1);
        }
      }
      
      User.findByIdAndUpdate(req.session.user._id, req.session.user, (err) => {
        if (err) {
          throw err;
          }
        })
      res.redirect("/users/profile")
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
      req.session.user = req.body;
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
