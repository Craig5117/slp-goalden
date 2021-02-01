const router = require("express").Router();
const { User, Student, Goal, StudentGoal, Trial } = require("../models");

//Student routes

router.get("/students", (req, res) => {
	Student.findAll({}).then((data) => res.json(data));
});

//POST route for saving a student
router.post("/student", (req, res) => {
	Student.create({
		user_id: req.body.user_id,
		first_name: req.body.first_name,
		last_name: req.body.last_name,
	}).then((data) => {
		res.send("student created");
    })
    .catch((error) => res.json(error))
});

//DELETE route for deleting a student
router.delete("/student", (req, res) => {
	Student.destroy({
		where: {
			student: req.params.student,
		},
	}).then((student) => {
		res.delete(student);
	});
});

//PUT route for updating a student
router.put("/student", (req, res) => {
	Student.update(
		{
			user_id: req.body.user_id,
			first_name: req.body.first_name,
			last_name: req.body.last_name,
		},
		{
			where: {
				student: req.params.user,
			},
		}
	).then((student) => {
		res.update(student);
	});
});

//users routes
router.get("/users", (req, res) => {
	User.findAll({}).then((data) => res.json(data));
});

router.get("/goal", (req, res) => {
	Goal.findAll({}).then((data) => res.json(data));
});

router.get("/studentGoal", (req, res) => {
	StudentGoal.findAll({}).then((data) => res.json(data));
});

router.get("/trial", (req, res) => {
	Trial.findAll({}).then((data) => res.json(data));
});

//POST route for saving a new user
router.post("/user", (req, res) => {
	User
		.create({
			email: req.body.email,
			password: req.body.password,
		})
		.then((data) => {
			res.send("user creator");
		});
});

//DELETE route for deleting a user
router.delete('/user', (req, res) => {
  user.destroy({
    where: {
      user: req.params.user
    }
  }).then((user) => {
    res.delete(user);
  });
});

//PUT route for updating a user
router.put('/user', (req, res) => {
  user.update(
    {
      email: req.body.email,
      password: req.body.password
    },
    {
      where: {
        user: req.params.user
      }
    }
  ).then((user) => {
    res.update(user);
  });
});

//POST route for saving a goal
router.post("/goal", (req, res) => {
	Goal
		.create({
			goal_id: req.body.goal_id,
			user_id: req.body.user_id,
		})
		.then((data) => {
			res.send("goal creator");
		});
});

// DELETE route for deleting a goal
router.delete('/goal', (req, res) => {
  user.destroy({
    where: {
      goal: req.params.goal
    }
  }).then((goal) => {
    res.delete(goal);
  });
});

// PUT route for updating a goal
router.put('/goal', (req, res) => {
  user.update(
    {
      goal_id: req.body.goal_id,
      user_id: req.body.user_id,
    },
    {
      where: {
        goal: req.params.goal
      }
    }
  ).then((goal) => {
    res.update(goal);
  });
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
