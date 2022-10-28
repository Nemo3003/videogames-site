
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
app.use(express.json());
const PORT = process.env.PORT || 8080;
const mongodb = require('./db/connect');
const bodyParser = require('body-parser');
const { 
  errorLogger, 
  errorResponder, 
  invalidPathHandler 
} = require('./middleware/middleware');
const { application, response } = require('express');
const passport = require('passport');
const bcrypt = require('bcrypt');
const flash = require('express-flash');
const session = require('express-session');
const methodOverride = require('method-override')

const {createUs, getUserById} = require( './controllers/users.controllers')

//Passport configuration

app.use(express.urlencoded({ extended: false }))
//Sets up the session
app.use(flash())
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}))
app.use(passport.initialize())
app.use(passport.session())
//methodOverride is used to logout the user
app.use(methodOverride('_method'))

//const users = []

app.set('view-engine', 'ejs')
app.use(express.urlencoded({extended: false}));

//Checks whether the user is authenticated
app.get('/', checkAuthenticated, (req, res) => {
  res.render('index.ejs',{name: req.user.name});
});

//Loads the login form
app.get('/logins', checkNotAuthenticated ,(req, res) => {
  res.render('login.ejs');
})

//Sets up what will happen if the redirect is successful, a failure, and what message will be displayed
/*app.post('/logins', passport.authenticate('local',{
  successRedirect: '/app',
  failureRedirect: '/logins',
  failureFlash: true

}))*/
//Load links.ejs file
app.get('/app',checkAuthenticated, (req, res) => {
  res.render('links.ejs');
})
//Loads ejs form
app.get('/register', (req, res) => {
  res.render('register.ejs');
})
app.post('/logins', getUserById);
//This app.post will help us create users using a form in the register page
app.post('/register', createUs)

//Makes the post request to the db 
app.post('/register', (req, res) =>{
  res.render('register.ejs');
})
  app
  .use(bodyParser.json())
  .use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    next();
  })
  .use("/app",checkAuthenticated, require("./routes"))
 
//Logout 
app.delete('/logout', (req, res) => {
    req.logOut()
    res.redirect('/logins')
  })
  
// middleware
app.use(errorLogger)
app.use(errorResponder)
app.use(invalidPathHandler)

//This will stop any user not logged in from reaching our forbidden places in our app
function checkAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next()
  }

  res.redirect('/logins')
}

//This will stop any logged in user from reaching out the login and register pages
function checkNotAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return res.redirect('/')
  }
  next()
}

// Main
mongodb.initDb((err, mongodb) => {
  if (err) {
    console.log(err);
  } else {
    app.listen(PORT);
    console.log(`Connected to port => ${PORT}`);
  }
});