const seedUsers = require('./user-seeds');
const seedStudents = require('./student-seeds');
const seedGoals = require('./goal-seeds');
const seedStudentGoals = require('./studentgoal-seeds');
const seedTrials = require('./trial-seeds');

const sequelize = require('../../config/connection');

const seedAll = async () => {
    await sequelize.sync({ force: true });
    console.log('--------------------------------');

    await seedUsers();
    console.log('--------------------------------');

    await seedStudents();
    console.log('--------------------------------');

    await seedGoals();
    console.log('--------------------------------');

    await seedStudentGoals();
    console.log('--------------------------------');

    await seedTrials();
    console.log('--------------------------------');
    
};

seedAll();