const router = require("express").Router();
// const withAuth = require("../utils/auth");
const sequelize = require("../config/connection");
const { User, Student, Goal, StudentGoal, Trial } = require("../models");

router.get("/", (req, res) => {
    if (req.session.loggedIn) {
        res.redirect("/dashboard")
    }
  res.render("login");
});

router.get("/dashboard", (req, res) => {
  // User.findOne where id = req.session.user_id
  User.findOne({
    where: {
      id: req.session.user_id
    },
    attributes: [
      "username"
    ]
  })
  .then((dbUserData) => {
    const username = dbUserData.username;
    res.render("dashboard", { username, loggedIn: req.session.loggedIn });
  })
  .catch((err) => {
    console.log(err);
    res.status(500).json(err);
  });
  
});

router.get("/trial-submit/:id", (req, res) => {
  res.render("trial-submission", {loggedIn: req.session.loggedIn});
});

module.exports = router;
