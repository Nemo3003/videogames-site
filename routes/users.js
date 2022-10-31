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
router.get('/signup', (req,res)=>{
    res.render('../views/users/signup.hbs')
})
router.get('/about', (req,res)=>{
    res.render('../views/about.hbs')
})
router.get('/:id', getUserById)
router.post('/', createUs)
router.delete('/:id', deleteUs)


// Exports
module.exports = router;