
var cors = require('cors')
const express = require('express');
const router = express.Router();
const User = require('../models/User')
const passport = require('passport')

const {createUs, deleteUs, getUserById} = require( '../controllers/users.controllers');

router.get('/', (req,res)=>{
    res.render('../views/index.hbs')
})
router.get('/signin', (req,res)=>{
    res.render('../views/users/signin.hbs')
})
router.post('/signin', passport.authenticate("local", {
    successRedirect: "/app/app/games/games/add",
    failureRedirect: "/app/signin",
    failureFlash: true,
  }));

// Sign up 
router.get('/signup', (req,res)=>{
    res.render('../views/users/signup.hbs')
})
router.post('/signup', async (req,res)=>{
    const {name, email, password, confirm_password} = req.body;
    const errors = []
    if(name <= 0){errors.push({text: "Name cannot be empty"})}
    if(email <= 0){errors.push({text: "Email cannot be empty"})}
    if(password <= 0){errors.push({text: "Password cannot be empty"})}
    if(password != confirm_password){errors.push({ text: 'Passwords do not match'})}
    if(password.length < 8){errors.push({ text: 'Password must be at least 8 characters long'});}
    if(errors.length > 0){res.render('../views/users/signup.hbs', {errors, name, email,password, confirm_password})}
    else{
        // Look for email coincidence
  const userFound = await User.findOne({ email: email });
  if (userFound) {
    req.flash("error_msg", "The Email is already in use.");
    return res.redirect("/app/signup");
  }

  // Saving a New User
  const newUser = new User({ name, email, password });
  newUser.password = await newUser.encryptPassword(password);
  await newUser.save();
  req.flash("success_msg", "You are registered.");
  res.redirect("/app/signin");
};
    }
)
// Renders the about view
router.get('/about', (req,res)=>{
    res.render('../views/about.hbs')
})
router.get('/:id', getUserById)
router.post('/', createUs)
router.delete('/:id', deleteUs)

// logout
router.get('/logout', (req,res) =>{
    req.logout();
    res.redirect('/');
})

// Exports
module.exports = router;