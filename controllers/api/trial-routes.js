const router = require("express").Router();
const sequelize = require("../../config/connection");
const { Trial } = require("../../models");

router.get("/trial", (req, res) => {
	Trial.findAll({}).then((data) => res.json(data));
});

//POST route for saving a new trial
router.post("/trial", (req, res) => {
	Trial
		.create({
			date: req.body.date,
            successful: req.body.successful,
            percent: req.body.percent,
            student_goal_id: req.body.student_goal_id,
            user_id: req.body.user_id,
		})
		.then((data) => {
			res.send("trial creator");
		});
});

// DELETE route for deleting a trial
router.delete('/trial', (req, res) => {
  user.destroy({
    where: {
      trial: req.params.user
    }
  }).then((trial) => {
    res.delete(trial);
  });
});

// PUT route for updating a trial
router.put('/trial', (req, res) => {
  trial.update(
    {
      date: req.body.date,
      successful: req.body.successful,
      percent: req.body.percent,
      student_goal_id: req.body.student_goal_id,
      user_id: req.body.user_id,
    },
    {
      where: {
        trial: req.params.user
      }
    }
  ).then((trial) => {
    res.update(trial);
  });
});

module.exports = router;