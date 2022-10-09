//@TS-Check
const express = require('express');
const cors = require('cors');
const app = express();
app.use(express.json());
const PORT = 8080;
const mongodb = require('./db/connect');
const bodyParser = require('body-parser');


app
  .use(bodyParser.json())
  .use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    next();
  })
  .use("/", require("./routes"));
// Main
mongodb.initDb((err, mongodb) => {
  if (err) {
    console.log(err);
  } else {
    app.listen(PORT);
    console.log(`Connected to port: ${PORT}`);
  }
});