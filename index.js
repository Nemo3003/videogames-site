//@TS-Check
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
app.use(express.json());
const PORT = 8080;
const mongodb = require('./db/connect');
const bodyParser = require('body-parser');
const path = require('path');
const axios = require('axios');
const { 
  errorLogger, 
  errorResponder, 
  invalidPathHandler 
} = require('./middleware/middleware')

app.use(express.static('static'));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/static/index.html'));
  });

  app.get('/auth', (req, res) => {
    res.redirect(
      `https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}`,
    );
  });
  app.get('/oauth-logged', ({ query: { code } }, res) => {
    const body = {
      client_id: process.env.GITHUB_CLIENT_ID,
      client_secret: process.env.GITHUB_SECRET,
      code,
    };
    const opts = { headers: { accept: 'application/json' } };
    axios
      .post('https://github.com/login/oauth/access_token', body, opts)
      .then((_res) => _res.data.access_token)
      .then((token) => {
        // eslint-disable-next-line no-console
        console.log('My token:', token);
  
        res.redirect(`/app`);
      })
      .catch((err) => res.status(500).json({ err: err.message }));
  });
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