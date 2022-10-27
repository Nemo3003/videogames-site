//@TS-Check
const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;
const bcrypt = require('bcrypt');

const createUs = async (req, res) => {
    try{
        const hashedPassword =  await bcrypt.hash(req.body.password, 10)
        const users = {
            fname: req.body.fname,
            lname: req.body.lname,
            password: hashedPassword
          };
          const response = await mongodb.getDb().db('videogames').collection('users').insertOne(users);
            response.acknowledged
            res.status(201).json(response);
  
}catch(e){
    res.status(500).send( 'Some error occurred while creating the users.');
}
}


module.exports ={
    createUs
}