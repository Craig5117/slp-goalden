const sequelize = require('../../config/connection');
const { User, Goal, Student, StudentGoal, Trial } = require('../../models');

const userdata = [
    {
        username: 'Mr.Crandall',
        email: 'acrandall@slp.org',
        password: 'password123'
    },
    {   
        username: 'Mr.Bennett',
        email: 'cbennett@slp.org',
        password: 'password123'
    }, 
    {   
        username: 'Ms.Jensen',
        email: 'jjensen@slp.org',
        password: 'password123'
    }, 
    {   
        username: 'Ms.Kennedy',
        email: 'lkennedy@slp.org',
        password: 'password123'
    },
    {
        username: 'Mr.Dodgen',
        email: 'edodgen@slp.org',
        password: 'password123'
    },
    {
        username: 'Mr.Nwizu',
        email: 'snwizu@slp.org',
        password: 'password123'
    }
];

const seedUsers = () => User.bulkCreate(userdata, {individualHooks: true});

module.exports = seedUsers;