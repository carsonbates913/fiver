const HttpError = require('../models/error');
const { validationResult } = require('express-validator');
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jsonwebtoken = require('jsonwebtoken');


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
    token = await jsonwebtoken.sign({userId: newUser.id}, 'this_needs_conversion_to_ev_variable', {expiresIn: "1h"}); 
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
    token = await jsonwebtoken.sign({userId: existingUser.id}, 'this_needs_conversion_to_ev_variable', {expiresIn: "1h"}); 
  } catch (error) {
    return next(new HttpError("Something went wrong, could not login user"));
  }

  res.status(200).json({name: existingUser.name, userId: existingUser.id, token: token});
}


exports.getUsers = getUsers;
exports.getUserById = getUserById;
exports.signup = signup;
exports.login = login;