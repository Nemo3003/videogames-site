
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
app.use(express.json());
const PORT = process.env.PORT || 8080;
const mongodb = require('./db/connect');
const bodyParser = require('body-parser');
const path = require('path');
const axios = require('axios');
const { auth, requiresAuth, } = require('express-openid-connect');
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

const {createUs} = require( './controllers/users.controllers')
const initializePassport = require('./passport-config')
initializePassport(
  passport,
  email => users.find(user => user.email === email),
  id => users.find(user => user.id === id)
)
app.use(express.urlencoded({ extended: false }))
app.use(flash())
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}))
app.use(passport.initialize())
app.use(passport.session())
app.use(methodOverride('_method'))

const users = []

app.set('view-engine', 'ejs')
app.use(express.urlencoded({extended: false}));

app.get('/', (req, res) => {
  res.render('index.ejs');
});


app.get('/logins', (req, res) => {
  res.render('login.ejs');
})

app.post('/logins', passport.authenticate('local',{
  successRedirect: '/app',
  failureRedirect: '/logins',
  failureFlash: true

}))

app.get('/app', (req, res) => {
  res.render('links.ejs');
})

app.get('/register', (req, res) => {
  res.render('register.ejs');
})

app.post('/register', createUs)
app.post('/register', (req, res) =>{
  res.render('register.ejs');
})
  app
  .use(bodyParser.json())
  .use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    next();
  })
  .use("/app", require("./routes"))
 
// middleware
app.use(errorLogger)
app.use(errorResponder)
app.use(invalidPathHandler)
// Main
mongodb.initDb((err, mongodb) => {
  if (err) {
    console.log(err);
  } else {
    app.listen(PORT);
    console.log(`Connected to port => ${PORT}`);
  }
});