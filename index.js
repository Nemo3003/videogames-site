
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
const initializedPassport = require('./passport-config');
initializedPassport(passport, email =>{
  return users.find(user => user.email === email)
})

const users = []

app.set('view-engine', 'ejs')
app.use(express.urlencoded({extended: false}));

app.get('/', (req, res) => {
  res.render('index.ejs');
});


app.get('/logins', (req, res) => {
  res.render('login.ejs');
})

app.post('/logins', (req, res) => {
  
})

app.get('/register', (req, res) => {
  res.render('register.ejs');
})

app.post('/register', async(req, res) => {

  try{
    const hashedPassword = await bcrypt.hash(req.body.password,10)
    users.push({
      id: Date.now().toString,
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword
    })
    res.redirect('/logins')
  }
  catch{  
    res.redirect('/register')
  }
  console.log(users)
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