
const mongodb = require("../db/connect");
const ObjectId = require("mongodb").ObjectId;
const bcrypt = require("bcrypt");
const { response } = require("express");
require("dotenv").config();
const User = require('../models/User')
const passport = require('passport')
let coded2 = encodeURIComponent(process.env.GAMES_SECRET);

/*const getUserById = async (req, res) => {
  const User = {
    email: req.body.email,
    password: req.body.password,
  };

  const user = await mongodb
    .getDb()
    .db()
    .collection("users")
    .findOne({ email: User.email });

  bcrypt
    .compare(User.password, user?.password)
    .then(function(result) {
      if (result === true) {
        res.render("links.ejs", {link: "/app/app/games", name: user.name});
      } else {
        res.status(401).send("username or password incorrect");
      }
    })
    .catch((e) => {
      res.status(500).send("Server error signing in");
    });
    
};*/

const signUpIn = async (req,res)=>{
  const {name, email, password, confirm_password} = req.body;
  const errors = []
  if(name <= 0){errors.push({text: "Name cannot be empty"})}
  if(email <= 0){errors.push({text: "Email cannot be empty"})}
  if(password <= 0){errors.push({text: "Password cannot be empty"})}
  if(password != confirm_password){errors.push({ text: 'Passwords do not match'})}
  if(password.length < 8){errors.push({ text: 'Password must be at least 8 characters long'});}
  if(errors.length > 0){res.render('../views/users/signup.hbs', {errors, name, email,password, confirm_password})}
  else{
      // Look for email coincidence
const userFound = await User.findOne({ email: email });
if (userFound) {
  req.flash("error_msg", "The Email is already in use.");
  return res.redirect("/app/signup");
}

// Saving a New User
const newUser = new User({ name, email, password });
newUser.password = await newUser.encryptPassword(password);
await newUser.save();
req.flash("success_msg", "You are registered.");
res.redirect("/app/signin");
};
  }

const signPassp = passport.authenticate("local", {
  successRedirect: "/app/app/games/games/add",
  failureRedirect: "/app/signin",
  failureFlash: true,
})


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

const logout =  async function(req, res) {
  await req.logout((err) => {
      if (err) return next(err);
      req.flash("success_msg", "You are logged out now.");
      res.redirect("/app");
    });
}

module.exports = {
  createUs,
  deleteUs,
  signUpIn,
  signPassp,
  logout
};
