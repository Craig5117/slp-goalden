const sequelize = require('../../config/connection');
const { User, Goal, Student, StudentGoal, Trial } = require('../../models');

const studentdata = [
    {
        first_name: 'Sara',
        last_name: 'Hawk',
        user_id: 1
    },
    {
        first_name: 'Samuel',
        last_name: 'Potter',
        user_id: 1
    },
    {
        first_name: 'Alexander',
        last_name: 'Melville',
        user_id: 2
    },
    {
        first_name: 'Walter',
        last_name: 'Swift',
        user_id: 2
    },
    {
        first_name: 'Mabel',
        last_name: 'Gifford',
        user_id: 2
    },
    {
        first_name: 'Alexander',
        last_name: 'Bell',
        user_id: 3
    },
    {
        first_name: 'Smiley',
        last_name: 'Blanton',
        user_id: 5
    },
    {
        first_name: 'Elijah',
        last_name: 'Corlet',
        user_id: 5
    },
    {
        first_name: 'Cotton',
        last_name: 'Mather',
        user_id: 5
    },
    {
        first_name: 'Margaret',
        last_name: 'Powers',
        user_id: 5
    },
    {
        first_name: 'Dorothy',
        last_name: 'Sherman',
        user_id: 6
    },
    {
        first_name: 'Mildred',
        last_name: 'Berry',
        user_id: 6
    },
];

const seedStudents = () => Student.bulkCreate(studentdata, {individualHooks: true});

module.exports = seedStudents;