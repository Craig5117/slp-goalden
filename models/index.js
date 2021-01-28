const User = require('./User');
const Student = require('./Student');
const Goal = require('./Goal');
const Trial = require('./Trial');

// User associations
    User.hasMany(Student, {
        foreignKey: 'user_id'
    });

    User.belongsToMany(Student, {
        foreignKey: 'user_id'
    })

// Student associations
    Student.belongsTo(User, {
        foreignKey: 'student_id'
    });

    Student.hasMany(Goal, {
        foreignKey: 'student_id'
    });

    Student.hasMany(Trial, {
        foreignKey: 'student_id'
    });

    Student.belongsToMany(Goal, {
        foreignKey: 'student_id'
    });

    Studnet.belongsToMany(Trials, {
        foreignKey: 'student_id'
    });

// Goal associations

    Goal.hasMany(Student, {
        foreignKey: 'student_id'
    });

    Goal,hasMany(Trial, {
        foreignKey: 'trial_id'
    });

    Goal.belongsToMany(Student, {
        foreignKey: 'student_id'
    });

    Goal.belongsToMany(Trial, {
        foreignKey: 'trial_id'
    });

// Trial associations
    Trial.belongsTo(Student, {
        foreignKey: 'student_id'
    });

    Trial.belongsTo(Goal, {
        foreignKey: 'goal_id'
    });

    module.exports = { User, Student, Goal, Trial };


