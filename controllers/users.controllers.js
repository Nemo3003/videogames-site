//@TS-Check
const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;
const bcrypt = require('bcrypt');
const { response } = require('express');

const createUs = async (req, res) => {
    try{
        const hashedPassword =  await bcrypt.hash(req.body.password, 10)
        const users = {
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword
          };
          const response = await mongodb.getDb().db('videogames').collection('users').insertOne(users);
            response.acknowledged
            res.status(201).json(response);
  
}catch(e){
    res.status(500).send( 'Some error occurred while creating the users.');
}
response.redirect('/logins');
}


module.exports ={
    createUs
}