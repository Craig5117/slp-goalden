const sequelize = require('../../config/connection');
const { User, Goal, Student, StudentGoal, Trial } = require('../../models');

const studentgoaldata = [
    {
        student_id: 1,
        goal_id: 4,
        user_id: 1
    },
    {
        student_id: 1,
        goal_id: 8,
        user_id: 1
    },
    {
        student_id: 4,
        goal_id: 8,
        user_id: 2
    },
    {
        student_id: 2,
        goal_id: 3,
        user_id: 2
    },
    {
        student_id: 3,
        goal_id: 3,
        user_id: 2
    },
    {
        student_id: 6,
        goal_id: 9,
        user_id: 3
    },
    {
        student_id: 11,
        goal_id: 5,
        user_id: 6
    },
    {
        student_id: 12,
        goal_id: 6,
        user_id: 6
    },
    {
        student_id: 12,
        goal_id: 7,
        user_id: 6
    },
    
];

const seedStudentGoals = () => StudentGoal.bulkCreate(studentgoaldata, {individualHooks: true});

module.exports = seedStudentGoals;