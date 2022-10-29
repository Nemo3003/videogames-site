//This will stop any user not logged in from reaching our forbidden places in our app
function checkAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }
  
    res.redirect("/logins");
  }
  
  //This will stop any logged in user from reaching out the login and register pages
  function checkNotAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
      return res.redirect("/");
    }
    next();
  }

  module.exports ={
    checkAuthenticated,
    checkNotAuthenticated
  }