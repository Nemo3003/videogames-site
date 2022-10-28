//@TS-Check
const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;
const bcrypt = require('bcrypt');
const { response } = require('express');

const getUserById = async (req, res) => {
    const userId = new ObjectId(req.params.id);
    const User ={
      email: req.body.email,
      password: req.body.password
    }
    const result = await mongodb
    .getDb()
    .db('videogames')
    .collection("users")
    .find({ _id: userId, email: User.email, password: User.password })
    .then((result) => {
      res.setHeader('Content-Type', 'application/json');
      if(result.length > 0){
        res.status(200).json(result);
      } else{
        res.status(404).json({message: 'Nothing with that id was found!'});
      }
    });
  };


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
            res.status(201).redirect('/logins')
    }catch(e){
        res.status(500).send( 'Some error occurred while creating the users.');
    }
}
const deleteUs = async (req, res) => {
    const userId = new ObjectId(req.params.id);
    const resPonder = 200
    try {
      await mongodb.getDb().db('videogames').collection('users').deleteOne({ _id: userId }, true);
      res.sendStatus(200);
    } catch (error) {
       res.status(500).send;
    }};

module.exports ={
    createUs,
    deleteUs,
    getUserById
}