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
    console.log('req body: ', req.body)
    User.findById(req.body.id, (err, user) => {
      const { friendRequests: sessionRequests } = req.session.user;
      console.log('sessionRequests: ', sessionRequests)
      console.log(typeof sessionRequests)
     })
  res.redirect("/users/profile");
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
