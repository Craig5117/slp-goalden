const router = require('express').Router();

const dashboardRoutes = require('./dashboard-routes.js');

router.use('/', dashboardRoutes);

module.exports = router;