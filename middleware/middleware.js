// middleware.js
const errorLogger = (err, req, res, next) => {
    console.error('\x1b[31m', err) // adding some color to our logs
    next(err) // calling next middleware
  }
  
  const errorResponder = (err, req, res, next) => {
    res.header("Content-Type", 'application/json')
    res.status(err.statusCode).send(JSON.stringify(err, null, 4)) 
    console.log('not working')// pretty print
  }
  const invalidPathHandler = (req, res, next) => {
    res.send("The URL you are trying to reach does not exist.")
    res.status(404)
  }
  
  module.exports = 
  { 
    errorLogger, 
    errorResponder,
    invalidPathHandler 
  }