
var cors = require('cors')
const express = require('express');
const router = express.Router();

const {
    getAllGames, 
    getGameById, 
    createGame, 
    updateGame, 
    deleteGame
} = require('../controllers/games.controllers');
const Game = require('../models/Game');
const {isAuthenticated} = require('../helpers/authChecker');

// Games
router.get('/', isAuthenticated,getAllGames);

//Renders the form to create a new game
router.get('/games/add', isAuthenticated,(req,res)=>{
    res.render('../views/games/new-game')
})
// This will post the new game to the database while sending error messages if necessary
router.post('/new-game', isAuthenticated,async(req,res) => {
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

})
//Renders the list of the games added
router.get('/games-added',isAuthenticated, async (req,res)=>{
    const games = await Game.find({user: req.user.id})
    .lean()
    .sort({date: 'desc'});
    res.render('../views/games/all-games.hbs', { games });
})

//Renders the edit form for the games
router.get('/games/edit/:id', isAuthenticated,async (req,res)=>{
    const gamesi = await Game.findById(req.params.id).lean()
    res.render('../views/games/edit-game.hbs', {gamesi})
})

//Sends the new games modified
router.put('/games/edit-game/:id',isAuthenticated,async (req,res)=>{
    const {title, description, type, price} = req.body;
    await Game.findByIdAndUpdate(req.params.id, {title, description, type, price});
    req.flash('success_msg', 'Game has been updated successfully')
    res.redirect('/app/app/games/games-added')
})
//Deletes the game
router.delete('/games/delete/:id',isAuthenticated, async (req, res)=> {
    await Game.findByIdAndDelete(req.params.id);
    req.flash('success_msg', 'Game has been deleted successfully')
    res.redirect('/app/app/games/games-added');
})

router.get('/:id',isAuthenticated, getGameById);

router.post('/', isAuthenticated,createGame)


router.put('/:id', isAuthenticated,updateGame);

router.delete('/:id',isAuthenticated, deleteGame);


// Exports
module.exports = router;