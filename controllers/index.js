const router = require('express').Router();

const dashboardRoutes = require('./dashboard-routes.js');
const apiRoutes = require('./api/');
const studentRoutes = require('./student-routes.js');
const goalRoutes = require('./goal-routes.js');

router.use('/', dashboardRoutes);
router.use('/api', apiRoutes);
router.use('/students', studentRoutes);
router.use('/goals', goalRoutes);

module.exports = router;