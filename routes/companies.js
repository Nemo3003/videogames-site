//@TS-Check
var cors = require('cors')
const express = require('express');
const router = express.Router();


const {
    getAllComps,
   getCompById, 
   createComp,
   deleteComp,
   updateComp
} = require('../controllers/companies.controllers');

router.get('/', getAllComps);

router.get('/:id', getCompById);

router.post('/', createComp);

router.put('/:id', updateComp);

router.delete('/:id', deleteComp);
// Exports
module.exports = router;