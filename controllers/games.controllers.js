//@TS-Check
const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

//-***********************************************************************************************

const getAllGames = async (req, res) => {
  const result = await mongodb.getDb().db('videogames').collection("games").find().toArray().then((result) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(result);
  });
};

//-***********************************************************************************************

const getGameById = async (req, res) => {
  const gameId = new ObjectId(req.params.id);
  const result = await mongodb.getDb().db('videogames').collection("games").find({ _id: gameId }).toArray().then((result) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(result);
  });
};

//-***********************************************************************************************

const createGame = async (req, res) => {
  
  const game = {
    title: req.body.title,
    description: req.body.description,
    type: req.body.type,
    Price: req.body.Price
  };
  const response = await mongodb.getDb().db('videogames').collection('games').insertOne(game);
  if (response.acknowledged) {
    res.status(201).json(response);
  } else {
    res.status(500).json(response.error || 'Some error occurred while creating the game.');
  }
};

//-***********************************************************************************************

const deleteContact = async (req, res) => {
  const gameId = new ObjectId(req.params.id);
  const resPonder = 200
  try {
    await mongodb.getDb().db('videogames').collection('games').deleteOne({ _id: gameId }, true);
    res.sendStatus(200);
  } catch (error) {
     res.status(500).send;
  }};

//-***********************************************************************************************

const updateContact = async (req, res) => {
  const userId = new ObjectId(req.params.id);
  // be aware of updateOne if you only want to update specific fields
  const game = {
    title: req.body.title,
    description: req.body.description,
    type: req.body.type,
    Price: req.body.Price
  };
  const response = await mongodb
    .getDb()
    .db('videogames')
    .collection('games')
    .replaceOne({ _id: userId }, game);
  console.log(response);
  if (response.modifiedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Some error occurred while updating the game.');
  }
};

// Exports
module.exports = { 
   getAllGames,
   getGameById, 
   createGame,
   deleteContact,
   updateContact
  };