const router = require("express").Router();
// const withAuth = require("../utils/auth");
const sequelize = require("../config/connection");
const { User, Student, Goal, StudentGoal, Trial } = require("../models");

router.get("/", (req, res) => {
    Goal.findAll({
        where: {
            // this needs to be changed to req.session.user_id
            user_id: 6,
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
        res.json(userGoals);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
});

// option to add single goal route here
// this would link to a page where you could
// update or delete a goal via api routes

// option to add all goals route to access the goals api
// this could be used to allow users to view other user's goals
// and choose to add them to their own list of goals 
// via api update route

module.exports = router;