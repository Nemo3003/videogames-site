
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

// Games
router.get('/', getAllGames);

router.get('/games/add', (req,res)=>{
    res.render('../views/games/new-game')
})
router.post('/new-game', async(req,res) => {
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
    await newGame.save()
    res.redirect('/app/app/games/games-added')

})
router.get('/games-added', async (req,res)=>{
    const games = await Game.find().lean().sort({date: 'desc'});
    res.render('../views/games/all-games.hbs', { games });
})

router.get('/:id', getGameById);

router.post('/', createGame)




router.put('/:id', updateGame);

router.delete('/:id', deleteGame);


// Exports
module.exports = router;