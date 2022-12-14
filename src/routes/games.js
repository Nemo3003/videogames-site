
var cors = require('cors')
const express = require('express');
const router = express.Router();

const {
    getAllGames, 
    getGameById, 
    createGame, 
    updateGame, 
    deleteGame,
    newGame,
    seeGames,
    editGame,
    seeEdition,
    deleteGameNew
} = require('../controllers/games.controllers');
const {isAuthenticated} = require('../helpers/authChecker');

// Games
router.get('/', isAuthenticated,getAllGames);

//Renders the form to create a new game
router.get('/games/add', isAuthenticated,(req,res)=>{
    res.render('../views/games/new-game')
})
// This will post the new game to the database while sending error messages if necessary
router.post('/new-game', isAuthenticated,newGame)
//Renders the list of the games added
router.get('/games-added',isAuthenticated, seeGames)

//Renders the edit form for the games
router.get('/games/edit/:id', isAuthenticated,seeEdition)

//Sends the new games modified
router.put('/games/edit-game/:id',isAuthenticated,editGame)
//Deletes the game
router.delete('/games/delete/:id',isAuthenticated, deleteGameNew)

router.get('/:id',isAuthenticated, getGameById);

router.post('/', isAuthenticated,createGame)

router.put('/:id', isAuthenticated,updateGame);

router.delete('/:id',isAuthenticated, deleteGame);


// Exports
module.exports = router;