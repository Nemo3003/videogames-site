require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const exphbs = require("express-handlebars");
const app = express();
app.use(express.json());
const PORT = process.env.PORT || 8080;
const mongodb = require("./src/db/connect");
const bodyParser = require("body-parser");
const flash = require("connect-flash");
const session = require("express-session");
const methodOverride = require("method-override");
const passport = require("passport");

require('./src/db/database')
require('./src/config/passport')

app.set('views', path.join(__dirname, 'src/views'))
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

app.use(passport.initialize());
app.use(passport.session());
app.use(flash())

// global variables
app.use((req, res, next) => {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  let user = null
  if(req.user){
      user =JSON.parse(JSON.stringify(req.user))
  } 
  res.locals.user = user; 
  next();
});

//static files
app.use(express.static(path.join(__dirname, 'src/public')));

app
  .use(bodyParser.json())
  .use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    next();
  })
  .use("/app", require("./src/routes"));



// Main
mongodb.initDb((err, mongodb) => {
  if (err) {
    console.log(err);
  } else {
    app.listen(PORT);
    console.log(`Connected to port => ${PORT}`);
  }
});
