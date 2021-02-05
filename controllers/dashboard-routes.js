const router = require("express").Router();
const sequelize = require("../config/connection");
const { User, Student, Goal, StudentGoal, Trial } = require("../models");
const withAuth = require("../utils/auth");

router.get("/", (req, res, next) => {
    if (req.session.loggedIn) {    
    return res.redirect("/students");
    } 
  
   return res.render("login");
});

// router.get("/dashboard", withAuth, (req, res) => {
//   // User.findOne where id = req.session.user_id
//   User.findOne({
//     where: {
//       id: req.session.user_id
//     },
//     attributes: [
//       "username"
//     ]
//   })
//   .then((dbUserData) => {
//     const username = dbUserData.username;
//     res.render("dashboard", { username, loggedIn: req.session.loggedIn });
//   })
//   .catch((err) => {
//     console.log(err);
//     res.status(500).json(err);
//   });
  
// });

module.exports = router;
