//@TS-Check
var cors = require('cors')
const express = require('express');
const router = express.Router();

const {createUs, deleteUs, getUserById} = require( '../controllers/users.controllers')

router.get('/', (req,res)=>{
    res.render('../views/index.hbs')
})
router.get('/signin', (req,res)=>{
    res.render('../views/users/signin.hbs')
})
// Sign up 
router.get('/signup', (req,res)=>{
    res.render('../views/users/signup.hbs')
})
router.post('/signup', (req,res)=>{
    const {name, email, password, confirm_password} = req.body;
    const errors = []
    if(password != confirm_password){errors.push({ text: 'Passwords do not match'})}
    if(password.length < 8){errors.push({ text: 'Password must be at least 8 characters long'});}
    if(errors.length > 0){res.render('../views/users/signup.hbs', {errors, name, email,password, confirm_password})}
    else{res.send('ok')}
})
// Renders the about view
router.get('/about', (req,res)=>{
    res.render('../views/about.hbs')
})
router.get('/:id', getUserById)
router.post('/', createUs)
router.delete('/:id', deleteUs)


// Exports
module.exports = router;