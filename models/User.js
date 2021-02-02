const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const bcrypt = require('bcrypt');

class User extends Model {
    checkPassword(loginPw) {
        return bcrypt.compareSync(loginPw, this.password);
      }
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
        // username
        username: {
            type: DataTypes.STRING,
            allowNull: false,
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
            //password input must be between 8 and 50 characters in length, may use upper/lowercase, may use numbers, may use special chars
            validate: /^[0-9A-Za-z!@.,;:'"?-]{8,50}\z/
            // {
            //     len: [8]
            // }
        }
    },
    {
        hooks: {
            async beforeCreate(newUserData) {
                newUserData.password = await bcrypt.hash(newUserData.password, 10);
                return newUserData;
              },  
            async beforeUpdate(updatedUserData) {
                updatedUserData.password = await bcrypt.hash(updatedUserData.password, 10);
                return updatedUserData;
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