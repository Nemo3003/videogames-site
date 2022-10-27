const localStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt');

function initialize(passport, getUserByEmail){
    const authenticatedUser = (email, password, done) =>{
        const user = getUserByEmail(email)
        if(user == null){
            return done(null, false, {message: 'No user with email ' + email})
        }
        try{
            if(await bcrypt.compare(password, user.password)){
                return done(null, user)
            }else{
                return done(null, false, {message: 'Ups, you broke something'});
            }
        }catch(e) {
            return done(e)
        }
    }
    passport.use( new localStrategy({
        usernameField: 'email'
    }), authenticatedUser)
    passport.serializeUser((user, done)=>{

    })
    passport.deserializeUser((id, done)=>{
        
    })
}

module.exports ={
    initialize
}