
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
const { application } = require('express');

app.use(
  auth({
    authRequired: false,
    auth0Logout: true,
    issuerBaseURL: process.env.ISSUER_BASE_URL,
    baseURL: process.env.BASE_URL,
    clientID: process.env.CLIENT_ID,
    secret: process.env.SECRET,
    idpLogout: true,
  })
);

app.use(express.static('static'));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/static/index.html'));
});


app.get('/login', (req, res) => {
  //Authenticate server
})

app.post('/users', (req, res) =>{

})

  app.get('/app', (req, res) => {
    res.sendFile(path.join(__dirname, '/static/links.html'));
  });
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