const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Trial extends Model {}

Trial.init (
    {
        // trial id
        id: {
            type: dataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        // *** date will be pulled from created_at field ***
        
        // number attempted
        attempted: {
            type: dataTypes.INTEGER,
            allowNull: false
        },
        // number successful
        successful: {
            type: dataTypes.INTEGER,
            allowNull: false,
            validate: {
                // validate that success is not more than attempted
                isGreaterThanAttempted(value) {
                    if (parseInt(value) < parseInt(this.attempted)) {
                    throw new Error("success can't be more than attempted");
                    }
                }
            }
        }
        // *** percent will be configured on the routes by dividing attempted/successful *100 ***

    },
    {
        sequelize,
        freezeTableName: true,
        underscored: true,
        modelName: 'trial'
    }
);

module.exports = Trial;