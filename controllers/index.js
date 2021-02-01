const router = require('express').Router();

const dashboardRoutes = require('./dashboard-routes.js');
const studentRoutes = require('./student-routes.js');
const goalRoutes = require('./goal-routes.js');

router.use('/', dashboardRoutes);
router.use('/students', studentRoutes);
router.use('/goals', goalRoutes);

module.exports = router;