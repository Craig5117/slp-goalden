const router = require('express').Router();
const withAuth = require('../utils/auth');
const sequelize = require('../config/connection');
const { User, Student, Goal, StudentGoal, Trial } = require('../models');

router.get('/', withAuth, (req, res) => {
	const userId = req.session.user_id;
	Student.findAll({
		where: {
			// finds all students belonging to current user
			user_id: userId
		},
		attributes: ['id', 'user_id', 'last_name', 'first_name'],
		include: [
			{
				model: User,
				attributes: ['username']
			}
		]
	})
		.then(studentData => {
			const username = req.session.username;
			const students = studentData.map(student => student.get({ plain: true }));
			// checks to see if data matches with current user
			if (students[0] == null) {
				res.render('all-students', {
					students,
					username,
					loggedIn: req.session.loggedIn
				});
			} else {
				const userIdComparison = students[0] ? students[0].user_id : -1;
				if (userIdComparison === userId) {
					res.render('all-students', {
						students,
						username,
						loggedIn: req.session.loggedIn
					});
				} else {
					res.status(401).render('unauthorized', { loggedIn: req.session.loggedIn });
				}
			}
		})
		.catch(err => {
			console.log(err);
			res.status(500).json(err);
		});
});

// single-student route
router.get('/student/:id', withAuth, (req, res) => {
    const username = req.session.username;
	const userId = req.session.user_id;
	const studentId = req.params.id;
	let studentName = 'Name';
	(async function () {
		await Student.findOne({
			where: {
				id: req.params.id
			},
			attributes: ['last_name', 'first_name']
		})
		.then(studentData => {
			if (studentData) {
				studentData.get({ plain: true });
				studentName = studentData.last_name;
				if (studentData.first_name) {
					studentName += `, ${studentData.first_name}`;
				}
			}
		});
		await StudentGoal.findAll({
			where: {
				student_id: req.params.id
			},
			attributes: ['id', 'user_id', 'student_id'],
			include: [
				{
					model: Goal,
					attributes: ['name', 'description']
				},
				{
					model: Trial,
                    attributes: ['date', 'successful', 'percent'],
				}, 
            ],
		})
			.then(studentGoalData => {
				const studentGoals = studentGoalData.map(studentGoal =>
					studentGoal.get({ plain: true })
				);
				// check user id here
				//   console.log(studentGoals)
				// replace student name and id with Student db call

				if (studentGoals[0] == null) {
					res.render('single-student', {
                        username,
						studentGoals,
						studentName,
						studentId,
						loggedIn: req.session.loggedIn
					});
				} else {
					const userIdComparison = studentGoals[0] ? studentGoals[0].user_id : -1;
					if (userIdComparison === userId) {
						res.render('single-student', {
                            username,
							studentGoals,
							studentName,
							studentId,
							loggedIn: req.session.loggedIn
						});
					} else {
						console.log(userId);
						console.log(userIdComparison);
						res
							.status(401)
							.render('unauthorized', { loggedIn: req.session.loggedIn });
					}
				}
			})
			.catch(err => {
				console.log(err);
				res.status(500).json(err);
			});
	})();
});

router.get('/submit/:number', withAuth, (req, res) => {
	const userId = req.session.user_id;
	const username = req.session.username;
	studNumber = req.params.number;
	// Gets user id from session to render into form data-userID attribute
	res.render('student-submissions', {
		username,
		studNumber,
		userId,
		loggedIn: req.session.loggedIn
	});
});

router.get('/trial-submit/:id', withAuth, (req, res) => {
    const username = req.session.username;
	StudentGoal.findOne({
		where: {
			id: req.params.id
		},
		attributes: ['id', 'user_id', 'student_id'],
		include: [
			{
				model: Student,
				attributes: ['last_name', 'first_name']
			},
			{
				model: Goal,
				attributes: ['name', 'description']
			}
		]
	})
		.then(studentGoalData => {
			if (studentGoalData) {
				studentGoalData.get({ plain: true });
			}
			const userIdComparison = studentGoalData ? studentGoalData.user_id : -1;

			if (userIdComparison === req.session.user_id) {
				let studentName = studentGoalData.student.last_name;
				if (studentGoalData.student.first_name) {
					studentName += `, ${studentGoalData.student.first_name}`;
				}
				const userId = studentGoalData.user_id;
				const studentId = studentGoalData.student_id;
				const goalName = studentGoalData.goal.name;
				const goalDesc = studentGoalData.goal.description;
				res.render('trial-submission', {
					loggedIn: req.session.loggedIn,
					username,
					userId,
					studentName,
					goalName,
					goalDesc,
					studentId
				});
			} else {
				res.status(401).render('unauthorized', { loggedIn: req.session.loggedIn });
			}
		})
		.catch(err => {
			console.log(err);
			res.status(500).json(err);
		});
});

router.get('/add-studentgoal/:id', withAuth, (req, res) => {
	const userId = req.session.user_id;
	const username = req.session.username;
	let studentName;
	(async function () {
		await Student.findOne({
			where: {
				id: req.params.id
			},
			attributes: ['last_name', 'first_name']
		})
		.then(studentData => {
			studentData.get({ plain: true });
			studentName = studentData.last_name;
			if (studentData.first_name) {
				studentName += `, ${studentData.first_name}`;
			}
		});
		await Goal.findAll({
			where: {
				// this needs to be changed to req.session.user_id
				user_id: userId
			},
			attributes: ['id', 'name', 'description']
		})
			.then(goalData => {
				const userGoals = goalData.map(userGoal => userGoal.get({ plain: true }));
				res.render('add-studentgoal', {
					userId,
					userGoals,
					username,
					studentName,
					loggedIn: req.session.loggedIn
				});
			})
			.catch(err => {
				console.log(err);
				res.status(500).json(err);
			});
	})();
});

module.exports = router;
