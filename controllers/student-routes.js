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
        const username = students[0].user.username;
        res.render("all-students", {
          students,
          username,
          loggedIn: req.session.loggedIn,
        });
      } else {
        res
          .status(401)
          .render("unauthorized", { loggedIn: req.session.loggedIn });
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
      //   console.log(studentGoals)
      const studentId = studentGoals[0].student_id
;      let studentName = studentGoals[0].student.last_name;
      if (studentGoals[0].student.first_name) {
        studentName += `, ${studentGoals[0].student.first_name}`;
      }
      res.render("single-student", { studentGoals, studentName, studentId, loggedIn: req.session.loggedIn });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get("/submit/:number", (req, res) => {
  const userId = req.session.user_id;
  studNumber = req.params.number;
  // Gets user id from session to render into form data-userID attribute
  res.render("student-submissions", {
    studNumber,
    userId,
    loggedIn: req.session.loggedIn,
  });
});

router.get("/trial-submit/:id", (req, res) => {
  StudentGoal.findOne({
    where: {
      id: req.params.id,
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
    ],
  })
    .then((studentGoalData) => {
      studentGoalData.get({ plain: true });
      let studentName = studentGoalData.student.last_name;
      if (studentGoalData.student.first_name) {
        studentName += `, ${studentGoalData.student.first_name}`;
      }
      const goalName = studentGoalData.goal.name;
      const goalDesc = studentGoalData.goal.description;
      const userId = studentGoalData.user_id;
      const studentId = studentGoalData.student_id;
      if (userId === req.session.user_id) {
        res.render("trial-submission", {
          loggedIn: req.session.loggedIn,
          userId,
          studentName,
          goalName,
          goalDesc,
          studentId
        });
      } else {
        res
          .status(401)
          .render("unauthorized", { loggedIn: req.session.loggedIn });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get('/add-studentgoal/:id', (req, res) => {
    const userId = req.session.user_id;
    const username = req.session.username;
    let studentName;
    (async function () {
       await Student.findOne({
            where: {
                id: req.params.id
            },
            attributes: [
                "last_name",
                "first_name"
            ]
        })
        
        .then((studentData) => {
            studentData.get({ plain: true })
            studentName = studentData.last_name;
            if (studentData.first_name) {
                studentName += `, ${studentData.first_name}`
            }
        });
       await Goal.findAll({
            where: {
                // this needs to be changed to req.session.user_id
                user_id: userId,
            },
            attributes: [
                "id",
                "name",
                "description",
            ]
        })
        .then((goalData) => {
            const userGoals = goalData.map((userGoal) => 
            userGoal.get({ plain: true })
            );
            res.render("add-studentgoal", { userId, userGoals, username, studentName, loggedIn: req.session.loggedIn })
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
    })();
});
   



module.exports = router;
