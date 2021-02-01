const router = require('express').Router();

const studentRoutes = require('./student-routes');
const userRoutes = require('./user-routes')

router.use('/students', studentRoutes);
router.use('/users', userRoutes);

module.exports = router;