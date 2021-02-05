const router = require("express").Router();
const sequelize = require("../../config/connection");
const { User } = require("../../models");
const withAuth = require("../../utils/auth");

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
        email: req.body.email,
      },
    }).then((dbUserData) => {
      if (!dbUserData) {
        res.status(400).json({ message: "No user found with that email address." });
        return;
      }
  
    //   // user verification
    const validPassword = dbUserData.checkPassword(req.body.password);
       if (!validPassword) {
         res.status(400).json({ message: "Password does not match with email address." });
       return;
       }
    res.cookie("authorization", req.session, {
        expires: new Date(Date.now() + "1440m"),
        secure: process.env.NODE_ENV === "production" ? true : false,
        sameSite: true,
        httpOnly: true
    })
    res.set("authorization", req.session);
    console.log("This is cookie data", req.session)
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
router.put("/:id", withAuth, (req, res) => {
    User.update(req.body, {
        individualHooks: true,
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

//DELETE route for deleting a user
router.delete("/:id", withAuth, (req, res) => {
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
