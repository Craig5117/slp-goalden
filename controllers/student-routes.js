const router = require("express").Router();
// const withAuth = require("../utils/auth");
const sequelize = require("../config/connection");
const { User, Student, Goal, StudentGoal, Trial } = require("../models");

router.get("/", (req, res) => {
  Student.findAll({
    where: {
      // this needs to be changed to req.session.user_id
      user_id: 1,
    },
    attributes: ["id", "user_id", "last_name", "first_name"],
  })
    .then((studentData) => {
      const students = studentData.map((student) =>
        student.get({ plain: true })
      );
      // again user_id needs to be replaced with req.session.user_id
      if (students[0].user_id === 1) {
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
        attributes: [
          "id",
          "user_id",
          "student_id"
        ],
        include: [
          {
          model: Student,
          attributes: ["last_name", "first_name" ]
          },
          {
            model: Goal,
            attributes: ["name", "description"]
          },
          {
            model: Trial,
            attributes: ["date", "successful", "percent"]
          }
        ]
    })
    .then((studentGoalData) => {
      const studentGoals = studentGoalData.map((studentGoal) => 
        studentGoal.get({ plain: true })
      );
      res.json(studentGoals);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
})

module.exports = router;