const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Goal extends Model {}

Goal.init (
    {
        // goal id
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        // name
        name: {
            type:DataTypes.STRING,
            allowNull: false,
        },
        // description
        description: {
            type:DataTypes.STRING,
            allowNull: false
        },
        // user_id through User Model
        user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'user',
                key: 'id'
            }
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