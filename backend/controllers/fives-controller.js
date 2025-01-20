const HttpError = require('../models/error');
const { validationResult } = require('express-validator');
const mongoose = require('mongoose');
const Five = require('../models/five');
const User = require('../models/user');

const getFives = async (req, res, next) => {
  let fives;
  try {
    fives = await Five.find({});
  } catch (error) {
    throw new HttpError("Somethign went wrong, could not find fives");
  } 

  res.json({fives: fives.map((five) => five.toObject({getters: true}))});
}

const getFiveById = async (req, res, next) => {
  const fiveId = req.params.fid;

  let five;
  try {
    five = await Five.findById(fiveId);
  } catch(error) {
    return next(new HttpError("Something went wrong, could not find a five"), 400);
  }

  if(!five){
    return next(new HttpError("Could not find a five for the provided id", 400));
  }

  res.json({five: five.toObject({getters: true})});
}

const getFivesByUserId = async (req, res, next) => {
  const userId = req.params.uid;

  let fives;
  try {
    fives = await Five.find({sender: userId});
  } catch(error) {
    next(new HttpError("Something went wrong, could not find fives"));
  }

  if(!fives || fives.length===0){
    return next(new HttpError("Could not find fives for the provided user id"));
  }

  res.status(200).json({five: fives.map((five) => five.toObject({getters: true}))}); 
}

const createFive = async (req, res, next) => {
  const errors = validationResult(req)
  if(!errors.isEmpty()){
    return next(new HttpError("Invalid inputs", 422));
  }

  const { to, toId, words, message, from, sender } = req.body;
  
  const createdFive = new Five(
    {
      to,
      toId,
      words,
      message,
      from,
      sender,
    }
  )

  let user;
  try {
    user = await User.findById(sender);
  } catch (error) {
    return next(new HttpError("Something went wrong, could not find sender"));
  }

  if (!user) {
    const error = new HttpError('Could not find user for provided id', 404);
    return next(error);
  }

  console.log(user);

  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    await createdFive.save({session: sess});
    user.fives.push(createdFive);
    await user.save({session: sess});
    await sess.commitTransaction();
  } catch (error) {
    return next(new HttpError("Somethign went wrong, could not save five"));
  }

  res.status(201).json(createdFive);
}

const updateFive = async (req, res, next) => {
  const errors = validationResult(req)
  if(!errors.isEmpty()){
    return next(new HttpError("Invalid inputs", 422));
  }

  const { words, message } = req.body;
  const fiveId = req.params.fid;

  let updatedFive;
  try {
    updatedFive =  await Five.findById(fiveId);
  } catch(error) {
    return next(new HttpError("Something went wrong, could not updated fives"));
  }

  updatedFive.words = words;
  updatedFive.message = message;

  try {
    await updatedFive.save();
  } catch(error) {
    return next(new HttpError("Something went wrong, could not save updated five"));
  }

  res.status(200).json({updatedFive: updatedFive.toObject({getters: true})});
}

const deleteFive = async (req, res, next) => {
  const fiveId = req.params.fid;

  let five;
  try {
    five = await Five.findById(fiveId).populate('sender');
  } catch(error) {
    return next(new HttpError("Something went wrong, could not find five to be deleted"));
  }

  if(!five){
    return next(new HttpError("Could not find a five with the provided id"));
  }

  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    await Five.findByIdAndDelete(fiveId).session(sess);
    five.sender.fives.pull(five);
    await five.sender.save({session: sess});
    await sess.commitTransaction();
  } catch (error) {
    return next(new HttpError("Something went wrong, could not find user attached to fiver to be deleted"));
  }



  res.status(200).json("Deleted five");
}

exports.getFives = getFives;
exports.getFiveById = getFiveById;
exports.getFivesByUserId = getFivesByUserId;
exports.createFive = createFive;
exports.updateFive = updateFive;
exports.deleteFive = deleteFive;