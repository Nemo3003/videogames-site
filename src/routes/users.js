
var cors = require('cors')
const express = require('express');
const router = express.Router();
const User = require('../models/User')
const passport = require('passport')
const {signUpIn,signPassp,logout} = require( '../controllers/users.controllers')

//const {createUs, deleteUs, getUserById} = require( '../controllers/users.controllers');

router.get('/', (req,res)=>{
    res.render('../views/index.hbs')
})
router.get('/signin', (req,res)=>{
    res.render('../views/users/signin.hbs')
})
router.post('/signin', signPassp);

// Sign up 
router.get('/signup', (req,res)=>{
    res.render('../views/users/signup.hbs')
})
router.post('/signup', signUpIn)
// Renders the about view
router.get('/about', (req,res)=>{
    res.render('../views/about.hbs')
})
//router.get('/:id', getUserById)
//router.post('/', createUs)
//router.delete('/:id', deleteUs)

// logout
router.get('/logout',logout);

// Exports
module.exports = router;