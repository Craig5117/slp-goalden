const router = require("express").Router();
const sequelize = require("../../config/connection");
const { StudentGoal } = require("../../models");

router.get("/studentGoal", (req, res) => {
	StudentGoal.findAll({}).then((data) => res.json(data));
});

//POST route for saving a new studentgoal
router.post("/studentGoal", (req, res) => {
	StudentGoal
		.create({
			student_id: req.body.student_id,
            goal_id: req.body.goal_id,
            user_id: req.body.user_id,
		})
		.then((data) => {
			res.send("studentGoal creator");
		});
});

// DELETE route for deleting a studentGoal
router.delete('/studentGoal', (req, res) => {
  studentGoal.destroy({
    where: {
      studentGoal: req.params.user
    }
  }).then((studentGoal) => {
    res.delete(studentGoal);
  });
});

// PUT route for updating a studentGoal
router.put('/studentGoal', (req, res) => {
  studentGoal.update(
    {
      student_id: req.body.student_id,
      goal_id: req.body.goal_id,
      user_id: req.body.user_id,
    },
    {
      where: {
        studentGoal: req.params.studentGoal
      }
    }
  ).then((studentGoal) => {
    res.update(studentGoal);
  });
});

module.exports = router;