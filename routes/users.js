//@TS-Check
var cors = require('cors')
const express = require('express');
const router = express.Router();

const {createUs} = require( '../controllers/users.controllers')

router.post('/', createUs)


// Exports
module.exports = router;