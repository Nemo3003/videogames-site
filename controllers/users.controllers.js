//@TS-Check
const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;
const bcrypt = require('bcrypt');

const createUs = async (req, res) => {
    try{
        const hashedPassword =  await bcrypt.hash(req.body.password, 10)
        const user = {
            fname: req.body.fname,
            lname: req.body.lname,
            password: hashedPassword
          };
          const response = await mongodb.getDb().db('videogames').collection('users').insertOne(user);
            response.acknowledged
            res.status(201).json(response);
  
}catch(e){
    res.status(500).send( 'Some error occurred while creating the users.');
}
}
const logUs = async (req, res) => {
    const user = user.find(user => user.name = req.body.fname)
    if(user == null){
        return res.status(404).send('Cannot find user')
    }
    try{

    }catch(e){
        res.status(500).send( 'Some error occurred while login the user.');
    }
}
    
  
    
  

module.exports ={
    createUs,
    logUs
}