const router = require('express').Router();

const studentRoutes = require('./student-routes');
const userRoutes = require('./user-routes');
const goalRoutes = require('./goal-routes');
const studentGoalRoutes = require('./studentgoal-routes');
const trialRoutes = require('./trial-routes');




router.use('/students', studentRoutes);
router.use('/users', userRoutes);
router.use('/goals', goalRoutes);
router.use('/student-goals', studentGoalRoutes);
router.use('/trials', trialRoutes);

module.exports = router;