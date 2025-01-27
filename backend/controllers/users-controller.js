const HttpError = require('../models/error');
const { validationResult } = require('express-validator');
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jsonwebtoken = require('jsonwebtoken');
const fs = require('fs');


const getUsers = async (req, res, next) => {
  let users
  try {
    users = await User.find({}, '-password')
  } catch(error) {
    return next(new HttpError("Something went wrong, could not find users"));
  }

  res.json({users: users.map((user) => user.toObject({getters: true}))})
}

const getUserById = async (req, res, next) => {
  const userId = req.params.uid;

  let user;
  try{
    user = await User.findById(userId);
  } catch (error) {
    return next(new HttpError("Something went wrong, could not find user by id"));
  }

  if(!user){
    return next(new HttpError("Could not find user with provided Id", 400));
  }

  res.json({user: user.toObject({getters: true})});
}

const signup = async (req, res, next) => {
  const errors = validationResult(req)
  if(!errors.isEmpty()){
    return next(new HttpError("Invalid inputs", 422));
  }

  const {email, password, name} = req.body;

  let existingUser;
  try {
    existingUser = await User.findOne({email: email});
  } catch (error) {
    return next(new HttpError("Something went wrong, could not find existing user"));
  }

  if(existingUser){
    return next(new HttpError("User exists already, please login"));
  }

  let hashedPassword;

  try{
    hashedPassword = await bcrypt.hash(password, 12);
  } catch (error) {
    return next(new HttpError("Unable to hash password, please try again"));
  }

  const newUser = new User(
    {
      email,
      password: hashedPassword,
      name,
      year: '',
      dev: false,
      des: false,
      pm: false, 
      core: false,
      mentor: false, 
      major: '',
      minor: '',
      birthday: '',
      home: '',
      quote: '',
      favoriteThing1: '',
      favoriteThing2: '',
      favoriteThing3: '',
      favoriteDartmouthTradition: '',
      funFact: '',
      picture: '',
      fives: [],
    }
  )

  try {
    await newUser.save();
  } catch(error) {
    return next(new HttpError("Could not sign up user", 400));
  }

  let token;
  try {
    token = await jsonwebtoken.sign({userId: newUser.id}, process.env.JWT_KEY, {expiresIn: "1h"}); 
  } catch (error) {
    return next(new HttpError("Something went wrong, could not sign up user with token"));
  }

  res.status(201).json({name: newUser.name, userId: newUser.id, token: token});
}

const login = async (req, res, next) => {
  const { email, password } = req.body;

  let existingUser;
  try {
    existingUser = await User.findOne({email: email});
  } catch (error) {
    return next(new HttpError("Something went wrong, could not find existing user"));
  }
 
  if(!existingUser){
    return next(new HttpError("Login credentials are incorrect, please try again"));
  }

  let isMatch = false;
  try{
    isMatch = await bcrypt.compare(password, existingUser.password);
  } catch (error) {
    return next(new HttpError("Something went wrong, please check your credentials and try again"));
  }

  if(!isMatch) {
    return next(new HttpError("Login credentials are incorrect, please try again"));
  }

  let token;
  try {
    token = await jsonwebtoken.sign({userId: existingUser.id}, process.env.JWT_KEY, {expiresIn: "1h"}); 
  } catch (error) {
    return next(new HttpError("Something went wrong, could not login user"));
  }

  res.status(200).json({name: existingUser.name, userId: existingUser.id, token: token});
}

const updateUser = async (req, res, next) => {
  const errors = validationResult(req)
  if(!errors.isEmpty()){
    console.log(req.body);
    console.log(errors);
    return next(new HttpError("Invalid inputs", 422));
  }

  const { 
    year,
    dev,
    des,
    pm,
    core,
    mentor,
    major,
    minor,
    birthday,
    home,
    quote,
    favoriteThing1,
    favoriteThing2,
    favoriteThing3,
    favoriteDartmouthTradition,
    funFact,
  } = req.body;

  const userId = req.params.uid;

  let updatedUser;
  try {
    updatedUser =  await User.findById(userId);
  } catch(error) {
    return next(new HttpError("Something went wrong, could not updated User"));
  }

  if(!updatedUser){
    return next(new HttpError("Could not find a User for this id"));
  } 

  if(updatedUser.id !== req.userData.userId){
    return next(new HttpError("You do not have authorization to edit this User"));
  }

  const imagePath = updatedUser.picture;

  updatedUser.year = year;
  updatedUser.dev = dev;
  updatedUser.des = des;
  updatedUser.pm = pm;
  updatedUser.core = core;
  updatedUser.mentor = mentor;
  updatedUser.major = major;
  updatedUser.minor = minor;
  updatedUser.birthday = birthday;
  updatedUser.home = home;
  updatedUser.quote = quote;
  updatedUser.favoriteThing1 = favoriteThing1;
  updatedUser.favoriteThing2 = favoriteThing2;
  updatedUser.favoriteThing3 = favoriteThing3;
  updatedUser.favoriteDartmouthTradition = favoriteDartmouthTradition;
  updatedUser.funFact = funFact;
  updatedUser.picture = req.file.path;
  try {
    await updatedUser.save();
  } catch(error) {
    return next(new HttpError("Something went wrong, could not save updated User"));
  }

  fs.unlink(imagePath, (error) => {
    console.log(error);
  })

  res.status(200).json({updatedUser: updatedUser.toObject({getters: true})});
}


exports.getUsers = getUsers;
exports.getUserById = getUserById;
exports.signup = signup;
exports.login = login;
exports.updateUser = updateUser;