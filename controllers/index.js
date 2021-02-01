const router = require('express').Router();

const dashboardRoutes = require('./dashboard-routes.js');
const studentRoutes = require('./student-routes.js')
router.use('/', dashboardRoutes);
router.use('/students', studentRoutes);

module.exports = router;