const router = require("express").Router();
// const withAuth = require("../utils/auth");
const sequelize = require("../config/connection");
const { User, Student, Goal, StudentGoal, Trial } = require("../models");

router.get("/", (req, res) => {
    // if (req.session.loggedIn) {
    //     res.redirect("/dashboard")
    // }
  res.render("login");
});

router.get("/dashboard", (req, res) => {
  res.render("dashboard");
});

router.get("/trial-submit/:id", (req, res) => {
  res.render("trial-submission");
});

module.exports = router;
