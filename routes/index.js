//@TS-Check
const express = require('express');
const router = express.Router();
const openCors = require("../middleware/openCors");
const path = require('path');
router.use(express.static('static'));
const {  requiresAuth } = require('express-openid-connect');


router.use('/', require('./swagger'));
router.use('/app/games', require('./games'));
router.use('/app/companies',  require('./companies'));
router.use('/app/users',require('./users'))

module.exports = router;

