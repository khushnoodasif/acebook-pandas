const express = require("express");
const router = express.Router();

const PostsController = require("../controllers/posts");

const sessionChecker = (req, res, next) => {
  if (!req.session.user) {
    res.redirect("/sessions/new");
  } else {
    next();
  }
};

router.get("/", sessionChecker, PostsController.Index);
router.post("/", PostsController.Create);
router.get("/new", PostsController.New);
router.post("/like", PostsController.Like)
router.post("/comments/new", PostsController.addComment)
router.post("/delete", PostsController.Delete);

module.exports = router;
