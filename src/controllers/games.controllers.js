//@TS-Check
const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;
const Game = require('../models/Game');

//-***********************************************************************************************

const getAllGames = async (req, res) => {
  const result = await mongodb.getDb().db('videogames').collection("games").find().toArray().then((result) => {
    res.setHeader('Content-Type', 'application/json');
    if(result.length > 0){
      res.status(200).json(result);
    } else{
      res.status(404).json({message: 'Nothing was found!'});
    }
  });
};

const seeGames = async (req,res)=>{
  const games = await Game.find({user: req.user.id})
  .lean()
  .sort({date: 'desc'});
  res.render('../views/games/all-games.hbs', { games });
}

//-***********************************************************************************************

const getGameById = async (req, res) => {
  const gameId = new ObjectId(req.params.id);
  const result = await mongodb.getDb().db('videogames').collection("games").find({ _id: gameId }).toArray().then((result) => {
    res.setHeader('Content-Type', 'application/json');
    if(result.length > 0){
      res.status(200).json(result);
    } else{
      res.status(404).json({message: 'Nothing with that id was found!'});
    }
  });
};

//-***********************************************************************************************

const createGame = async (req, res) => {
  
  const game = {
    title: req.body.title,
    description: req.body.description,
    type: req.body.type,
    price: req.body.price
  };
  const response = await mongodb.getDb().db('videogames').collection('games').insertOne(game);
  if (response.acknowledged) {
    res.status(201).json(response);
  } else {
    res.status(500).json(response.error || 'Some error occurred while creating the game.');
  }
};

const newGame = async(req,res) => {
  const{title,description,type,price} = req.body;
  const errors = [];
  if(!title){errors.push({text: 'Incert title!'});}
  if(!description){errors.push({text: 'Incert description!'});}
  if(!type){errors.push({text: 'Incert type!'});}
  if(!price){errors.push({text: 'Incert price!'});}
  if(errors.length >0){
      res.render('../views/games/new-game', {
          errors,
          title,
          description,
          type,
          price
      });
  }
  const newGame = new Game({title, description, type, price});
  //Shows only the games created by that user in particular
  newGame.user = req.user.id;
  await newGame.save()
  req.flash('success_msg', 'Game added successfully')
  res.redirect('/app/app/games/games-added')

}

//-***********************************************************************************************

const deleteGame = async (req, res) => {
  const gameId = new ObjectId(req.params.id);
  const resPonder = 200
  try {
    await mongodb.getDb().db('videogames').collection('games').deleteOne({ _id: gameId }, true);
    res.sendStatus(200);
  } catch (error) {
     res.status(500).send;
  }};

const deleteGameNew = async (req, res)=> {
  await Game.findByIdAndDelete(req.params.id);
  req.flash('success_msg', 'Game has been deleted successfully')
  res.redirect('/app/app/games/games-added');
}

//-***********************************************************************************************

const updateGame = async (req, res) => {
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

const editGame = async (req,res)=>{
  const {title, description, type, price} = req.body;
  await Game.findByIdAndUpdate(req.params.id, {title, description, type, price});
  req.flash('success_msg', 'Game has been updated successfully')
  res.redirect('/app/app/games/games-added')
}

const seeEdition = async (req,res)=>{
  const gamesi = await Game.findById(req.params.id).lean()
  res.render('../views/games/edit-game.hbs', {gamesi})
}

// Exports
module.exports = { 
   getAllGames,
   getGameById, 
   createGame,
   deleteGame,
   updateGame,
   newGame,
   seeGames,
   editGame,
   seeEdition,
   deleteGameNew
  };