const router = require("express").Router();
const sequelize = require("../../config/connection");
// add withAuth helper
const { User } = require("../../models");

//users routes
router.get("/", (req, res) => {
  User.findAll({
    attributes: { exclude: ["password"] },
  }).then((data) => res.json(data));
});

//POST route for saving a new user
router.post("/", (req, res) => {
  User.create({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
  })
    .then((dbUserData) => {
      // session code here
      req.session.save(() => {
        req.session.user_id = dbUserData.id;
        req.session.username = dbUserData.username;
        req.session.loggedIn = true;

        res.json(dbUserData);
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// login
router.post("/login", (req, res) => {
    User.findOne({
      where: {
        username: req.body.username,
      },
    }).then((dbUserData) => {
      if (!dbUserData) {
        res.status(400).json({ message: "No user found with that username." });
        return;
      }
  
    //   // user verification
    //   const validPassword = dbUserData.checkPassword(req.body.password);
    //   if (!validPassword) {
    //     res
    //       .status(400)
    //       .json({ message: "Password does not match with username." });
    //     return;
    //   }
      req.session.save(() => {
        // sets session variables to confirm user is logged in
        req.session.user_id = dbUserData.id;
        req.session.username = dbUserData.username;
        req.session.loggedIn = true;
  
        res.json({ user: dbUserData, message: "You are now logged in!" });
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
  });
  
  // logout
  router.post("/logout", (req, res) => {
    if (req.session.loggedIn) {
      req.session.destroy(() => {
        res.status(204).end();
      });
    } else {
      res.status(404).end();
    }
  });

//PUT route for updating a user
router.put("/:id", (req, res) => {
    User.update(
      {
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    )
      .then((dbUserData) => {
        if (!dbUserData) {
          res.status(404).json({ message: "No user found with this id" });
          return;
        }
        res.json(dbUserData);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  });

//DELETE route for deleting a user
router.delete("/:id", (req, res) => {
  User.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((dbUserData) => {
      if (!dbUserData) {
        res.status(404).json({ message: "No user found with this id" });
        return;
      }
      res.json(dbUserData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
