const router = require("express").Router();
// const withAuth = require("../utils/auth");
const sequelize = require("../config/connection");
const { User, Student, Goal, StudentGoal } = require("../models");

router.get("/", (req, res) => {
    if (req.session.loggedIn) {
        res.redirect("/dashboard")
    }
  res.render("login");
});

router.get("/dashboard", (req, res) => {
  res.render("dashboard");
});

router.get("/students", (req, res) => {
  Student.findAll({
    where: {
      // this needs to be changed to req.session.user_id
      user_id: 3,
    },
    attributes: ["id", "user_id", "last_name", "first_name"],
  })
    .then((studentData) => {
      const students = studentData.map((student) =>
        student.get({ plain: true })
      );
      // again user_id needs to be replaced with req.session.user_id
      if (students[0].user_id === 2) {
        res.render("all-students", { students });
      } else {
        res.status(401).render("unauthorized");
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get("/student/:id", (req, res) => {
    StudentGoal.findAll({
        where: {
            student_id: req.params.id,
        },
        attributes
    })
})

router.get("/trial-submit/:id", (req, res) => {
  res.render("trial-submission");
});

module.exports = router;
