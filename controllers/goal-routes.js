const router = require("express").Router();
const sequelize = require("../config/connection");
const { User, Student, Goal, StudentGoal, Trial } = require("../models");
const withAuth = require("../utils/auth");

// route to load user's goals
router.get("/", withAuth, (req, res) => {
    const userId = req.session.user_id;
    const username = req.session.username;
    Goal.findAll({
        where: {
            // targets only goals relevant to current user
            user_id: userId,
        },
        attributes: [
            "id",
            "name",
            "description",
        ]
    })
    .then((goalData) => {
        // console.log(goalData)
        if (goalData == null) {
        res.render("all-goal-view", {username, userId, loggedIn: req.session.loggedIn});
        }
        else {
        const userGoals = goalData.map((userGoal) => 
          userGoal.get({ plain: true })
        );
        res.render("all-goal-view", {userGoals, username, userId, loggedIn: req.session.loggedIn});
        }
        
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
});

router.get('/submit', withAuth, (req, res) => {
    const username = req.session.username
    const userId = req.session.user_id;
    res.render('goal-submission', {userId, username, loggedIn: req.session.loggedIn})
});

// option to add single goal route here
// this would link to a page where you could
// update or delete a goal via api routes

// option to add all goals route to access the goals api
// this could be used to allow users to view other user's goals
// and choose to add them to their own list of goals 
// via api update route

module.exports = router;