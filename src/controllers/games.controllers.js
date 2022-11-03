//@TS-Check
const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;
const Game = require('../models/Game');

//-***********************************************************************************************

const getAllGames = async (req, res) => {
  try{
  Game.find({}, function(err, games) {
    let gameMap = {};
    games.forEach(function(game) {
      gameMap[games._id] = game;
    });
    res.status(200).send(gameMap);  
  }).lean().sort();}
  catch(e){
    res.status(404).send(e)
  }
};

const seeGames = async (req,res)=>{
  const games = await Game.find({user: req.user.id})
  .lean()
  .sort({date: 'desc'});
  res.render('../views/games/all-games.hbs', { games });
}

//-***********************************************************************************************

const getGameById = async (req, res) => {
  const gameFound = await Game.findById(req.params.id).sort({date: 'desc'})
    res.json(gameFound)
};

//-***********************************************************************************************

const createGame = async (req, res) => {
  
  const {title, description, type, price, engine, platform, classification} = req.body;
    try{
    const newGame = new Game(
      {title, description, type, price, engine, platform, classification});
        await newGame.save();
        res.status(200).json(newGame)
    }
    catch(e){
      res.status(500).json(e)
    }
};

const newGame = async(req,res) => {
  const{title,description,type,price, engine, platform, classification} = req.body;
  const errors = [];
  if(!title){errors.push({text: 'Incert title!'});}
  if(!description){errors.push({text: 'Incert description!'});}
  if(!type){errors.push({text: 'Incert type!'});}
  if(!price){errors.push({text: 'Incert price!'});}
  if(!engine){errors.push({text: 'Incert engine!'});}
  if(!platform){errors.push({text: 'Incert platform!'});}
  if(!classification){errors.push({text: 'Incert classification!'});}
  if(errors.length >0){
      res.render('../views/games/new-game', {
          errors,
          title,
          description,
          type,
          price,
          engine,
          platform,
          classification
      });
  }
  try{
  const newGame = new Game({title, description, type, price, engine, platform, classification});
  //Shows only the games created by that user in particular
  newGame.user = req.user.id;
  await newGame.save()
  req.flash('success_msg', 'Game added successfully')
  res.status(200).redirect('/app/app/games/games-added')
}
catch(e){
  req.flash('error_msg', 'Game has not been added successfully')
  res.status(500).redirect('/app/app/games/games-added')
}

}

//-***********************************************************************************************

const deleteGame = async (req, res) => {
  try{
  await Game.findByIdAndDelete(req.params.id);
    //res.redirect('/');
    res.status(201)
  }catch(err){
    res.status(500).send(err)
  }}

const deleteGameNew = async (req, res)=> {
  await Game.findByIdAndDelete(req.params.id);
  req.flash('success_msg', 'Game has been deleted successfully')
  res.redirect('/app/app/games/games-added');
}

//-***********************************************************************************************

const updateGame = async (req, res) => {
  const {title, description, type, price, engine, platform, classification} = req.body;
  try{
    const gameEdited = await Game.findByIdAndUpdate(req.params.id, 
      {title, description, type, price, engine, platform, classification});
    //res.redirect('/')
    res.status(200).json(gameEdited)
  }
  catch (e){
    res.status(500).json(e)
  }
};

const editGame = async (req,res)=>{
  const {title, description, type, price, engine, platform, classification} = req.body;
  await Game.findByIdAndUpdate(req.params.id, {title, description, type, price,engine, platform, classification});
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