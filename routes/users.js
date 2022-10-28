//@TS-Check
var cors = require('cors')
const express = require('express');
const router = express.Router();

const {createUs, deleteUs, getUserById} = require( '../controllers/users.controllers')

router.get('/:id', getUserById)
router.post('/', createUs)
router.delete('/:id', deleteUs)


// Exports
module.exports = router;