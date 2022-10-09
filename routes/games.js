//@TS-Check
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



// Games
router.get('/', getAllGames);

router.get('/:id', getGameById);

router.post('/', createGame)

router.put('/:id', updateGame);

router.delete('/:id', deleteGame);


// Exports
module.exports = router;