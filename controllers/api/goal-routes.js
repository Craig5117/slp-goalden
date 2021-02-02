const router = require("express").Router();
const sequelize = require("../../config/connection");
const { Goal } = require("../../models");
const withAuth = require("../../utils/auth");

router.get("/", withAuth, (req, res) => {
  Goal.findAll({
    where: {
      user_id: req.session.user_id,
    },
    attributes: ["id", "name", "description", "user_id"],
  }).then((dbGoalData) => res.json(dbGoalData));
});

//POST route for saving a goal
router.post("/", withAuth, (req, res) => {
  Goal.create({
    name: req.body.name,
    description: req.body.description,
    user_id: req.session.user_id,
    // user_id: req.body.user_id,
  })
    .then((dbGoalData) => {
      res.json(dbGoalData);
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
});

// PUT route for updating a goal
router.put("/:id", withAuth, (req, res) => {
    Goal.update(
        {
          name: req.body.name,
      description: req.body.description
        },
        {
            // might be able to use a Sequelize.and to protect this route
          where: {
            id: req.params.id,
          },
        }
      )
      .then((dbGoalData) => {
        if (!dbGoalData) {
            res.status(404).json({ message: "No goal found with this id." });
            return;
          }
          res.json(dbGoalData);
        })
        .catch((err) => {
          console.log(err);
          res.status(500).json(err);
        });
  });

// DELETE route for deleting a goal
router.delete("/:id", withAuth, (req, res) => {
  Goal.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((dbGoalData) => {
      if (!dbGoalData) {
        res.status(404).json({ message: "No goal found with this id" });
        return;
      }
      res.json(dbGoalData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
