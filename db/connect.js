//@TS-Check

const dotenv = require('dotenv');
dotenv.config();
const MongoClient = require('mongodb').MongoClient;
const MongoServer = process.env.MONGODB_URI
let _database;

const initDb = (callback) => {
  if (_database) {
    console.log('Db has already been initialized!');
    return callback(null, _database);
  }
  // Here we pass the mongo uri that this app requires in order to connect to the database
  MongoClient.connect(MongoServer)
    .then((client) => {
      _database = client;
      callback(null, _database);
    })
    .catch((err) => {
      callback(err);
    });
};

const getDb = () => {
  try{
    return _database;
  }catch(e){
    throw Error('Db not initialized');
  }
};

module.exports = {
  initDb,
  getDb,
};