const User = require("../models/user");

const UsersController = {
  Index: (req, res) => {
    User.find((err, users) => {
      if (err) {
        throw err;
      }
      res.render("users/index", {
        users: users.filter((user) => user._id != req.session.user._id),
        currentUser: req.session.user,
        user: req.session.user,
      });
    });
  },

  New: (req, res) => {
    res.render("users/new", {});
  },

  Profile: (req, res) => {
    User.findOne({ _id: req.session.user }).
    populate("friends").populate("friendRequests").exec((err, user) => {
      if (err) {  throw err; }
      res.render("users/profile", {
      user: user,
      });
    });
  },

  Friends: (req, res) => {
    User.findOne( { _id: req.session.user._id } ).
    populate("friends").populate("friendRequests").exec((err, user) => {
      if (err) {  throw err; }
      res.render("users/friends", {
        user: user,
      });
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
        req.flash("error", "Please enter an e-mail.");
        res.redirect("/users/new");
      } else if (newUser.password == "") {
        req.flash("error", "Please enter a password.");
        res.redirect("/users/new");
      } else if (newUser.passwordCheck == "") {
        req.flash("error", "Please confirm your password");
        res.redirect("/users/new");
      } else if (newUser.password != newUser.passwordCheck) {
        req.flash("error", "Passwords do not match");
        res.redirect("/users/new");
      } else if (newUser.firstName == "") {
        req.flash("error", "Please enter a first name.");
        res.redirect("/users/new");
      } else if (newUser.lastName == "") {
        req.flash("error", "Please enter a last name.");
        res.redirect("/users/new");
      } else if (newUser.dob == "") {
        req.flash("error", "Please enter a date of birth.");
        res.redirect("/users/new");
      } else {
        newUser.save((err) => {
          if (err) {
            throw err;
          }
          console.log(newUser.password);
          console.log(newUser.passwordCheck);
          res.status(201).redirect("/posts");
        });
      }
    });
  },

  RequestFriend: (req, res) => {
    User.findById(req.body.id, (err, user) => {
      if (err) {
        throw err;
      }
      user.friendRequests.push(req.session.user);
      User.updateOne(
        { _id: user },
        { $addToSet: { friendRequests: req.session.user } },
        (err) => {
          if (err) {
            throw err;
          }
        }
      );
      res.redirect("/users");
    });
  },

  DeclineRequestFriend: (req, res) => {
    User.findOne( { _id: req.body.id } ).exec((err, user) => {
      if (err) {  throw err; }
      console.log('user: ', user)

      User.findOne( { _id: req.session.user._id } ).exec((err, currentUser) => {
        if (err) {  throw err; }
        console.log('currentUser: ', currentUser)

        const { friendRequests } = currentUser
        const filteredFriendRequests = friendRequests.filter(request => request.toString() != user._id.toString())
       
        currentUser.friendRequests = filteredFriendRequests;

        User.findByIdAndUpdate(currentUser._id, currentUser, (err) => {
          if (err) {  throw err; }
          res.redirect("/users/friends")
          })
        })
      })
    },

  // CreateFriend: (req, res) => {
  //   User.findById(req.body.id, (err, user) => {
  //     req.session.user.friends.push(user)
  //     //console.log('req.session.user.friends: ', req.session.user.friends)
  //     const { friendRequests } = req.session.user
  //     console.log('id: ', req.session.user._id)
  //     console.log('id type: ', typeof req.session.user._id)
  //     console.log('friendRequests: ', friendRequests)
  //     console.log('friendRequests obj type: ', typeof friendRequests[0])
      
  //     const filteredFriendRequests = friendRequests.filter(request => request.toString() != user._id.toString())
  //     console.log('filteredFriendRequests: ', filteredFriendRequests)

  //     req.session.user.friendRequests = filteredFriendRequests;
  //     console.log('req.session.user.friendRequests: ', req.session.user.friendRequests)

  //     // for (var i = 0; i < req.session.user.friendRequests.length; i++) {
  //     //   if (req.session.user.friendRequests[i]._id == user._id) {
  //     //     req.session.user.friendRequests.splice(i, 1);
  //     //   }
  //     // }

  //     User.findByIdAndUpdate(req.session.user._id, req.session.user, (err) => {
  //       if (err) {
  //         throw err;
  //       }
  //     });
  //   }).then(() => {
  //     const sessionUser = req.session.user;
  //     User.findById(req.body.id, (err, user) => {
  //       user.friends.push(sessionUser);
  //       User.findByIdAndUpdate(user._id, user, (err) => {
  //         if (err) {
  //           throw err;
  //         }
  //       });
  //     });
  //   });
  //   res.redirect("/users/friends");
  // },

  CreateFriend: (req, res) => {
    const sessionUser = req.session.user
    sessionUser.friends.push(req.body.id)
    sessionUser.friendRequests = sessionUser.friendRequests.filter(request => request.toString() != req.body.id.toString())
    User.findByIdAndUpdate(sessionUser._id, sessionUser, (err) => {
      if (err) {  throw err; }
    });
    User.findById(req.body.id, (err, user) => {
      if (err) {  throw err; }
      user.friends.push(sessionUser)
      User.findByIdAndUpdate(user._id, user, (err) => {
        if (err) {  throw err; }
      });
    }).then(() => {
      res.redirect("/users/friends")
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
    }).then(() => {
      User.findOne({ _id: req.session.user._id }).
      populate("friends").populate("friendRequests").exec((err, user) => {
        if (err) {  throw err; }
        res.render("users/profile", {
        user: user,
        changeSubmitted: true,
        });
      });
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
