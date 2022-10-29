//@TS-Check
const mongodb = require("../db/connect");
const ObjectId = require("mongodb").ObjectId;
const bcrypt = require("bcrypt");
const { response } = require("express");

const getUserById = async (req, res) => {
  const User = {
    email: req.body.email,
    password: req.body.password,
  };

  const user = await mongodb
    .getDb()
    .db("videogames")
    .collection("users")
    .findOne({ email: User.email });

  bcrypt
    .compare(User.password, user?.password)
    .then(function(result) {
      if (result === true) {
        res.render("links.ejs", {link: "/app/app/games"});
      } else {
        res.status(401).send("username or password incorrect");
      }
      
    })
    .catch((e) => {
      res.status(500).send("Server error signing in");
    });
    
};

const createUs = async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const users = {
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
    };
    const response = await mongodb
      .getDb()
      .db()
      .collection("users")
      .insertOne(users);
    response.acknowledged;
    res.status(201).redirect("/logins");
  } catch (e) {
    console.error(e);
    res.status(500).send("Some error occurred while creating the users.");
  }
};
const deleteUs = async (req, res) => {
  const userId = new ObjectId(req.params.id);
  const resPonder = 200;
  try {
    await mongodb
      .getDb()
      .db()
      .collection("users")
      .deleteOne({ _id: userId }, true);
    res.sendStatus(200);
  } catch (error) {
    res.status(500).send;
  }
};

module.exports = {
  createUs,
  deleteUs,
  getUserById,
};
