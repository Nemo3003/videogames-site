//@TS-Check
var cors = require('cors')
const express = require('express');
const router = express.Router();

const {
    getAllGames, 
    getGameById, 
    createGame, 
    updateContact, 
    deleteContact
} = require('../controllers/games.controllers');


// Main
router.get('/', getAllGames);

router.get('/:id', getGameById);

router.post('/', createGame)

router.put('/:id', updateContact);

router.delete('/:id', deleteContact);

// Exports
module.exports = router;