const seedUsers = require('./user-seeds');

const sequelize = require('../../config/connection');

const seedAll = async () => {
    await sequelize.sync({ force: true });
    console.log('--------------------------------');

    await seedUsers();
    console.log('--------------------------------');
    
};

seedAll();