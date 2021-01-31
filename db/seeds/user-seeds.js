const sequelize = require('../../config/connection');
const { User, Goal, Student, StudentGoal, Trial } = require('../../models');

const userdata = [
    {
        email: 'acrandall@slp.org',
        password: 'password123'
    },
    {
        email: 'cbennett@slp.org',
        password: 'password123'
    }, 
    {
        email: 'jjensen@slp.org',
        password: 'password123'
    }, 
    {
        email: 'lkennedy@slp.org',
        password: 'password123'
    },
    {
        email: 'edodgen@slp.org',
        password: 'password123'
    },
    {
        email: 'snwizu@slp.org',
        password: 'password123'
    }
];

const seedUsers = () => User.bulkCreate(userdata, {individualHooks: true});

module.exports = seedUsers;