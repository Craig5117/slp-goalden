const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class StudentGoal extends Model {}

StudentGoal.init (
    {
        // student goal id
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        // student_id through Student Model
        student_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'student',
                key: 'id'
            }
        },
        // goal_id through Goal Model
        goal_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'goal',
                key: 'id'
            }
        },
        // user_id through User Model
        user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'user',
                key: 'id'
            }
        },
    },
    {
        sequelize,
        freezeTableName: true,
        underscored: true,
        modelName: 'studentgoal'
    }
)


module.exports = StudentGoal;