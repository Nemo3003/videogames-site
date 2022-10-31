require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const exphbs = require("express-handlebars");
const app = express();
app.use(express.json());
const PORT = process.env.PORT || 8080;
const mongodb = require("./db/connect");
const bodyParser = require("body-parser");
const {
  errorLogger,
  errorResponder,
  invalidPathHandler,
} = require("./middleware/middleware");
const { application, response } = require("express");
const passport = require("passport");
const bcrypt = require("bcrypt");
const flash = require("express-flash");
const session = require("express-session");
const methodOverride = require("method-override");
const { createUs, getUserById } = require("./controllers/users.controllers");
require(('./database'))



app.set('views', path.join(__dirname, 'views'))
const hbs = exphbs.create({
  defaultLayout: "main",
  layoutsDir: path.join(app.get("views"), "layouts"),
  partialsDir: path.join(app.get("views"), "partials"),
  extname: ".hbs",
});
app.engine(".hbs", hbs.engine);
app.set("view engine", ".hbs");

//Middleware
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method'));
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: true,
  saveUninitialized: true
}))

//static files
app.use(express.static(path.join(__dirname, 'public')));

let coded1 =  process.env.MAIN_SECRET;

//Load links.ejs file
app.get(`/${decodeURIComponent(coded1)}`, (req, res) => {

});
//Loads ejs form

app.get("/register", (req, res) => {

});
app.post("/logins", getUserById);
//This app.post will help us create users using a form in the register page
app.post("/register", createUs);

//Makes the post request to the db
app.post("/register", (req, res) => {

});
app
  .use(bodyParser.json())
  .use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    next();
  })
  .use("/app", require("./routes"));



// Main
mongodb.initDb((err, mongodb) => {
  if (err) {
    console.log(err);
  } else {
    app.listen(PORT);
    console.log(`Connected to port => ${PORT}`);
  }
});
