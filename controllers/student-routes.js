const router = require("express").Router();
// const withAuth = require("../utils/auth");
const sequelize = require("../config/connection");
const { User, Student, Goal, StudentGoal, Trial } = require("../models");

router.get("/", (req, res) => {
    const userId = req.session.user_id;
  Student.findAll({
    where: {
      // finds all students belonging to current user
      user_id: userId,
    },
    attributes: ["id", "user_id", "last_name", "first_name"],
    include: [
      {
        model: User,
        attributes: ["username"],
      },
    ],
  })
    .then((studentData) => {
      const students = studentData.map((student) =>
        student.get({ plain: true })
      );
      // checks to see if data matches with current user
      if (students[0].user_id === userId) {
          const username = students[0].user.username
        res.render("all-students", { students, username, loggedIn: req.session.loggedIn });
      } else {
        res.status(401).render("unauthorized", {loggedIn: req.session.loggedIn});
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get("/student/:id", (req, res) => {
    const userId = req.session.user_id;
  StudentGoal.findAll({
    where: {
      student_id: req.params.id,
    },
    attributes: ["id", "user_id", "student_id"],
    include: [
      {
        model: Student,
        attributes: ["last_name", "first_name"],
      },
      {
        model: Goal,
        attributes: ["name", "description"],
      },
      {
        model: Trial,
        attributes: ["date", "successful", "percent"],
      },
    ],
  })
    .then((studentGoalData) => {
      const studentGoals = studentGoalData.map((studentGoal) =>
        studentGoal.get({ plain: true })
      );
      // check user id here
      res.json(studentGoals);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get("/:number", (req, res) => {
    const userId = req.session.user_id;
  studNumber = req.params.number;
  // Gets user id from session to render into form data-userID attribute
  res.render("student-submissions", { studNumber, userId, loggedIn: req.session.loggedIn });
});

module.exports = router;
