const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Goal extends Model {}

Goal.init (
    {
        // goal id
        id: {
            type: dataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        // name
        date: {
            type:dataTypes.STRING,
            allowNull: false,
        },
        // description
        description: {
            type:dataTypes.STRING,
            allowNull: false
        }
    },
    {
        sequelize,
        freezeTableName: true,
        underscored: true,
        modelName: 'goal'
    }
);

module.exports = Goal;