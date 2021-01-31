const sequelize = require('../../config/connection');
const { User, Goal, Student, StudentGoal, Trial } = require('../../models');

const trialdata = [
    {
        date: '1/29/2021',
        successful: '9/10',
        percent: '90%',
        student_goal_id: 1,
        user_id: 2
    },
    {
        date: '1/25/2021',
        successful: '3/4',
        percent: '75%',
        student_goal_id: 1,
        user_id: 2
    },
    {
        date: '11/20/2019',
        successful: '7/7',
        percent: '100%',
        student_goal_id: 3,
        user_id: 1
    },
    {
        date: '5/2/1991',
        successful: '10/20',
        percent: '50%',
        student_goal_id: 4,
        user_id: 2
    },
    {
        date: '3/22/2018',
        successful: '20/50',
        percent: '40%',
        student_goal_id: 5,
        user_id: 3
    },
    {
        date: '4/21/2018',
        successful: '40/50',
        percent: '80%',
        student_goal_id: 5,
        user_id: 3
    },
    {
        date: '5/23/2018',
        successful: '50/50',
        percent: '100%',
        student_goal_id: 5,
        user_id: 3
    },
    {
        date: '12/1/2019',
        successful: '1/10',
        percent: '10%',
        student_goal_id: 7,
        user_id: 1
    },
    {
        date: '12/21/2019',
        successful: '3/10',
        percent: '30%',
        student_goal_id: 7,
        user_id: 1
    },
    {
        date: '1/11/2021',
        successful: '7/10',
        percent: '70%',
        student_goal_id: 7,
        user_id: 1
    },
    {
        date: '10/2/2007',
        successful: '40/50',
        percent: '80%',
        student_goal_id: 8,
        user_id: 6
    },
    {
        date: '10/10/2007',
        successful: '35/50',
        percent: '75%',
        student_goal_id: 8,
        user_id: 6
    },
    {
        date: '10/26/2007',
        successful: '45/50',
        percent: '90%',
        student_goal_id: 8,
        user_id: 6
    },
    {
        date: '11/20/2011',
        successful: '3/4',
        percent: '75%',
        student_goal_id: 9,
        user_id: 6
    },
    {
        date: '12/2/2011',
        successful: '4/4',
        percent: '100%',
        student_goal_id: 9,
        user_id: 6
    },
    
    

];

const seedTrials = () => Trial.bulkCreate(trialdata, {individualHooks: true});

module.exports = seedTrials;