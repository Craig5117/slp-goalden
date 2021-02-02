const router = require("express").Router();
const sequelize = require("../../config/connection");
const { StudentGoal, Student, Goal, Trial } = require("../../models");
const withAuth = require("../../utils/auth");

router.get("/", withAuth, (req, res) => {
	StudentGoal.findAll({
        where: {
            user_id: req.session.user_id
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
    .then((studentGoalData) => res.json(studentGoalData))
    .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
});

//POST route for saving a new studentgoal
router.post("/", withAuth, (req, res) => {
	StudentGoal
		.create({
			student_id: req.body.student_id,
            goal_id: req.body.goal_id,
            user_id: req.body.user_id
		})
		.then((studentGoalData) => res.json(studentGoalData))
    .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
});

// PUT route for updating a studentGoal
router.put('/:id', withAuth, (req, res) => {
    StudentGoal.update(
      {
        goal_id: req.body.goal_id,
      },
      {
        where: {
          id: req.params.id
        }
      }
    ).then((studentGoalData) => {
      if (!studentGoalData) {
          res.status(404).json({ message: "No student goal found with this id" });
          return;
        }
        res.json(studentGoalData);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  });

// DELETE route for deleting a studentGoal
router.delete('/:id', withAuth, (req, res) => {
  StudentGoal.destroy({
    where: {
      id: req.params.id
    }
  }).then((studentGoalData) => {
    if (!studentGoalData) {
        res.status(404).json({ message: "No student goal found with this id" });
        return;
      }
      res.json(studentGoalData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;