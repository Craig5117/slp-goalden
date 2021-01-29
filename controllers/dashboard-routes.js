const router = require("express").Router();
// const withAuth = require("../utils/auth");
const sequelize = require("../config/connection");
const { User, Student, Goal, StudentGoal } = require('../models');


router.get('/', (req, res) => {
    res.render('login');
});

module.exports = router;