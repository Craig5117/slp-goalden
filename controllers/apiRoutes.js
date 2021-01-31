const router = require("express").Router();
const { User, Student, Goal, StudentGoal, Trial } = require("../models");

router.get("/students", (req, res) => {
	Student.findAll({}).then((data) => res.json(data));
});

router.get("/users", (req, res) => {
	User.findAll({}).then((data) => res.json(data));
});

//POST route for saving a new user
router.post("/user", (req, res) => {
	User
		.create({
			email: req.body.email,
			password: req.body.password,
		})
		.then((data) => {
			res.send("user creator");
		});
});

// DELETE route for deleting a user
// router.delete('/user', (req, res) => {
//   user.destroy({
//     where: {
//       user: req.params.user
//     }
//   }).then((user) => {
//     res.delete((user);
//   });
// });

// // PUT route for updating a user
// router.put('/user', (req, res) => {
//   user.update(
//     {
//       text: req.body.text,
//       complete: req.body.complete
//     },
//     {
//       where: {
//         user: req.params.user
//       }
//     }
//   ).then((user) => {
//     res.update(user);
//   });
// });

module.exports = router;
