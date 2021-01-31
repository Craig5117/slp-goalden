const User = require('./User');
const Student = require('./Student');
const Goal = require('./Goal');
const Trial = require('./Trial');
const StudentGoal = require('./StudentGoal');

// User -- Student associations (User has many Students, and Students belong to User through user_id in Student Model)
User.hasMany(Student, {
    foreignKey: 'user_id'
});

Student.belongsTo(User, {
    foreignKey: 'user_id'
});

// User -- Goal associations (User has many Goals, and Goals belong to User through user_id in Goal Model)
User.hasMany(Goal, {
    foreignKey: 'user_id'
});

Goal.belongsTo(User, {
    foreignKey: 'user_id'
});

   
// StudentGoal -- Student associations (Student has many StudentGoals, and StudentGoal belongs to Student through student_id in StudentGoal Model)
Student.hasMany(StudentGoal, {
    foreignKey: 'student_id'
});

StudentGoal.belongsTo(Student, {
    foreignKey: 'student_id'
});

// StudentGoal -- Goal associations (Goal has many StudentGoals, and StudentGoal belongs to Goal through goal_id in Goal Model)
Goal.hasMany(StudentGoal, {
    foreignKey: 'goal_id'
});

StudentGoal.belongsTo(Goal, {
    foreignKey: 'goal_id'
});

// Trial -- StudentGoal associations (StudentGoal has many Trials, and Trial belongs to StudentGoal through student_goal_id)
StudentGoal.hasMany(Trial, {
    foreignKey: 'student_goal_id'
});

Trial.belongsTo(StudentGoal, {
    foreignKey: 'student_goal_id'
});

// User -- StudentGoal assoications (User has many StudentGoals, and StudentGoal belongs to User through user_id in User Model)
User.hasMany(StudentGoal, {
    foreignKey: 'user_id'
});

StudentGoal.belongsTo(User, {
    foreignKey: 'user_id'
});

Trial.belongsTo(User, {
    foreignKey: 'user_id'
});

User.hasMany(Trial, {
    foreignKey: 'user_id'
});
   
module.exports = { User, Student, Goal, StudentGoal, Trial}


