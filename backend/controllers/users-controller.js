const HttpError = require('../models/error');
const { validationResult } = require('express-validator');
const User = require('../models/user');

const getUsers = async (req, res, next) => {
  let users
  try {
    users = await User.find({}, '-password')
  } catch(error) {
    return next(new HttpError("Something went wrong, could not find users"));
  }

  console.log(users);

  res.json({users: users.map((user) => user.toObject({getters: true}))})
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

  const newUser = new User(
    {
      email,
      password,
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
    newUser.save();
  } catch(error) {
    return next(new HttpError("Could not sign up user", 400));
  }

  res.status(201).json({newUser: newUser.toObject({getters: true})});
}

const login = async (req, res, next) => {
  const { email, password } = req.body;

  let existingUser;
  try {
    existingUser = await User.findOne({email: email});
  } catch (error) {
    return next(new HttpError("Something went wrong, could not find existing user"));
  }
 
  if(!existingUser || existingUser.password !== password){
    return next(new HttpError("Login credentials are incorrect, please try again"));
  }

  res.status(200).json({message: "successfully signed user in!"});
}


exports.getUsers = getUsers;
exports.signup = signup;
exports.login = login;