const sequelize = require("./config/connection");
const express = require("express");
const cookieParser = require("cookie-parser")
const routes = require("./controllers");
const helpers = require("./utils/helpers.js");
const path = require("path");
const exphbs = require("express-handlebars");
// can set defaultLayout in hbs object
const hbs = exphbs.create({ helpers });
const session = require("express-session");
const SequelizeStore = require("connect-session-sequelize")(session.Store);


const sess = {
  secret: "aywtd?inshfy?283",
  // can set maxAge here
  // maxAge: 86400000, for example, would expire the cookie after 24hours
//   cookie: { 
    
// },
  resave: false,
  saveUninitialized: true,
  // stores the new session to the database exported in config/connection
  store: new SequelizeStore({
    db: sequelize,
  }),
};

const app = express();

const PORT = process.env.PORT || 3001;
app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

app.use(cookieParser());
// use session
app.use(session(sess));
// middleware for post requests
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// // use static files in public
app.use(express.static(path.join(__dirname, "public")));

app.use(routes);

// initialize connection to the database then start the server
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log("Now listening"));
});