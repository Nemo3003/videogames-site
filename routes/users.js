//@TS-Check
var cors = require('cors')
const express = require('express');
const router = express.Router();

const {createUs, logUs} = require( '../controllers/users.controllers')

router.post('/', createUs)
router.post('/login', logUs)

// Exports
module.exports = router;