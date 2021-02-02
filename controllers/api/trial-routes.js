const router = require("express").Router();
const sequelize = require("../../config/connection");
const { Trial } = require("../../models");
const withAuth = require("../../utils/auth");

router.get("/:id", withAuth, (req, res) => {
  Trial.findAll({
    where: {
      student_goal_id: req.params.id,
    },
  })
    .then((dbTrialData) => res.json(dbTrialData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

//POST route for saving a new trial
router.post("/", withAuth, (req, res) => {
  Trial.create({
    date: req.body.date,
    successful: req.body.successful,
    percent: req.body.percent,
    student_goal_id: req.body.student_goal_id,
    user_id: req.body.user_id,
  })
    .then((dbTrialData) => res.json(dbTrialData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// PUT route for updating a trial
router.put("/trial", withAuth, (req, res) => {
  Trial.update(
    {
      date: req.body.date,
      successful: req.body.successful,
      percent: req.body.percent,
    },
    {
      where: {
        id: req.params.id,
      },
    }
  )
    .then((dbTrialData) => {
      if (!dbTrialData) {
        res.status(404).json({ message: "No student goal found with this id" });
        return;
      }
      res.json(dbTrialData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// DELETE route for deleting a trial
router.delete("/:id", withAuth, (req, res) => {
  Trial.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((dbTrialData) => {
      if (!dbTrialData) {
        res.status(404).json({ message: "No student goal found with this id" });
        return;
      }
      res.json(dbTrialData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
