const { info } = require('node-sass');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/User')

//Passport configuration
passport.use(
    new LocalStrategy(
      {usernameField: "email"},
      async (email, password, done) => {
        // Match Email's User
        const user = await User.findOne({ email: email });
        if (!user) {return done(null, false, { message: "Not User found." });}
  
        // Match Password's User
        const isMatch = await user.matchPassword(password);
        if (!isMatch)return done(null, false, { message: "Incorrect Password." });
        return done(null, user);
      }
    )
  );

//This allows you to save the user's session, this is useful to avoid asking the user to authenticate
//everytime they want to visit a page
passport.serializeUser((user, done)=>{
    done(null, user.id)
})
passport.deserializeUser((user, done)=>{
    User.findById(user.id, (err, user)=>{
        done(err,user);
    })
})