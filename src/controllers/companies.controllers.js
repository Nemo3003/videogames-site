//@TS-Check
const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

//-***********************************************************************************************

const getAllComps = async (req, res) => {
  const result = await mongodb.getDb().db('videogames').collection("companies").find().toArray().then((result) => {
    res.setHeader('Content-Type', 'application/json');
    if(result.length > 0){
    res.status(200).json(result);
  } else{
    res.status(404).json({message: 'Nothing found!'});
  }
  });
};

//-***********************************************************************************************

const getCompById = async (req, res) => {
  const companyId = new ObjectId(req.params.id);
  const result = await mongodb.getDb().db('videogames').collection("companies").find({ _id: companyId }).toArray().then((result) => {
    res.setHeader('Content-Type', 'application/json');
    if(result.length > 0){
      res.status(200).json(result);
    } else{
      res.status(404).json({message: 'Nothing with that id was found!'});
    }
  });
};

//-***********************************************************************************************

const createComp = async (req, res) => {
  
    const company = {
        c_name: req.body.c_name,
        direction: req.body.direction,
        address: req.body.address,
        city: req.body.city,
        games: req.body.games,
        country: req.body.country,
        employees: req.body.employees
      };
  const response = await mongodb.getDb().db('videogames').collection('companies').insertOne(company);
  if (response.acknowledged) {
    res.status(201).json(response);
  } else {
    res.status(500).json(response.error || 'Some error occurred while creating the companies.');
  }
};

//-***********************************************************************************************

const deleteComp = async (req, res) => {
  const companyId = new ObjectId(req.params.id);
  const resPonder = 200
  try {
    await mongodb.getDb().db('videogames').collection('companies').deleteOne({ _id: companyId }, true);
    res.sendStatus(200);
  } catch (error) {
     res.status(500).send;
  }};

//-***********************************************************************************************

const updateComp = async (req, res) => {
  const userId = new ObjectId(req.params.id);
  // be aware of updateOne if you only want to update specific fields
  const company = {
    c_name: req.body.c_name,
    direction: req.body.direction,
    address: req.body.address,
    city: req.body.city,
    games: req.body.games,
    country: req.body.country,
    employees: req.body.employees
  };
  const response = await mongodb
    .getDb()
    .db('videogames')
    .collection('companies')
    .replaceOne({ _id: userId }, company)
  if (response.modifiedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Some error occurred while updating the companies.');
  }
};

// Exports
module.exports = { 
   getAllComps,
   getCompById, 
   createComp,
   deleteComp,
   updateComp
  };