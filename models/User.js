const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class User extends Model {
    
    // *** need to set up CheckPassword function ***
}

User.init (
    {
        // user id
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        // email
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            // no duplicate emails
            unique: true,
            // check for email format
            validate: {
                isEmail: true
            }
        },
        // password
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            // Has to be at least 8 characters long
            validate: {
                len: [8]
            }
        },
        // pass in our imported sequlize connection to database
        sequelize,
        //don't automatically create createdAt/updatedAt timestamp fields
        timestamps: false,
        // don't pluralize name of database table
        freezeTableName: true,
        // use underscores instead of camel-casing
        underscored: true,
        // make it so model name stays lowercase in database
        modelName: 'user'
    }
);

module.exports = User;