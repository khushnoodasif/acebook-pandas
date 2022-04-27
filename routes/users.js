const express = require("express");
const router = express.Router();

const UsersController = require("../controllers/users");

const sessionChecker = (req, res, next) => {
  if (!req.session.user && !req.cookies.user_sid) {
    res.redirect("/sessions/new");
  } else {
    next();
  }
};

router.get("/", sessionChecker, UsersController.Index);
router.get("/new", UsersController.New);
router.post("/requestfriend", UsersController.RequestFriend);
router.post("/friend/new", UsersController.CreateFriend);
router.post("/", UsersController.Create);
router.post("/profile", sessionChecker, UsersController.Update);
router.get("/profile", sessionChecker, UsersController.Profile);
router.get("/delete", UsersController.Remove);
router.post("/delete", UsersController.Delete);

module.exports = router;
