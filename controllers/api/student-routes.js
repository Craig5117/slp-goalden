const router = require("express").Router();
const sequelize = require("../../config/connection");
const { Student } = require("../../models");
const withAuth = require("../../utils/auth");

//Student routes

router.get("/", withAuth, (req, res) => {
	Student.findAll({}).then((data) => res.json(data));
});

//POST route for saving a student
router.post("/", withAuth, (req, res) => {
	Student.create({
		user_id: req.body.user_id,
		first_name: req.body.first_name,
		last_name: req.body.last_name,
	}).then((studentData) => {
		res.json(studentData);
    })
    .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
});

//DELETE route for deleting a student
router.delete("/student", withAuth, (req, res) => {
	Student.destroy({
		where: {
			student: req.params.student,
		},
	}).then((student) => {
		res.delete(student);
	});
});

//PUT route for updating a student
router.put("/student", withAuth, (req, res) => {
	Student.update(
		{
			user_id: req.body.user_id,
			first_name: req.body.first_name,
			last_name: req.body.last_name,
		},
		{
			where: {
				student: req.params.user,
			},
		}
	).then((student) => {
		res.update(student);
	});
});

module.exports = router;