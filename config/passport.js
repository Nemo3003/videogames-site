const { info } = require('node-sass');
const passport = require('passport');
const LocalStrategy = require('passport.local').Strategy;
const User = require('../models/User')


passport.use( new LocalStrategy({
    userNameField: 'email',

}, async(email, password, done)=>{
   const user = await User.findOne({email: email})
   if(!user){
    done(null, false, 'No user found')
   }else{
    const match = await User.matchPassword(password)
    if(match){
        return done(null,false, done)
    }else{
        return done(null, false, 'Incorrect password')
    }
   }
}))
