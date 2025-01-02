const HttpError = require('../models/error.js');
const { validationResult } = require('express-validator');
const uuid = require('uuid');

let DUMMY_FIVES = [
  {
    id: 'f1',
    to: 'Carson',
    toId: 'u1',
    words: ["amazing", "smart"],
    message: "ur great!",
    from: "Akash",
    fromId: 's1',
  }
]


const getFiveById = (req, res, next) => {
  const fiveId = req.params.fid;
  const five = DUMMY_FIVES.find((five) => five.id===fiveId);
  console.log(five);

  if(!five){
    return next(new HttpError("Could not find a five for the provided id", 400));
  }

  res.json(five);
}

const getFivesByUserId = (req, res, next) => {
  const userId = req.params.uid;
  const fives = DUMMY_FIVES.filter((five) => five.toId===userId);

  if(!fives || fives.length===0){
    return next(new HttpError("Could not find fives for the provided user id"));
  }

  res.status(200).json(fives); 
}

const createFive = (req, res, next) => {
  const errors = validationResult(req)
  if(!errors.isEmpty()){
    throw new HttpError("Invalid inputs", 422);
  }

  const { to, toId, words, message, from, fromId } = req.body;
  const createdFive = {
    id: uuid.v4(),
    to,
    toId,
    words,
    message,
    from,
    fromId,
  }

  DUMMY_FIVES.push(createdFive);

  res.status(201).json(createdFive);
}

const updateFive = (req, res, next) => {
  const errors = validationResult(req)
  if(!errors.isEmpty()){
    throw new HttpError("Invalid inputs", 422);
  }

  const { words, message } = req.body;
  const fiveId = req.params.fid;

  const updatedFive = {...DUMMY_FIVES.find((five) => five.id === fiveId)};
  const fiveIndex = DUMMY_FIVES.findIndex((five) => five.id === fiveId);

  updatedFive.words = words;
  updatedFive.message = message; 

  DUMMY_FIVES[fiveIndex] = updatedFive;

  res.status(200).json(updatedFive);
}

const deleteFive = (req, res, next) => {
  const fiveId = req.params.fid;
  
  DUMMY_FIVES = DUMMY_FIVES.filter((five) => five.id !== fiveId);

  res.status(200).json("Deleted five");
}

exports.getFiveById = getFiveById;
exports.getFivesByUserId = getFivesByUserId;
exports.createFive = createFive;
exports.updateFive = updateFive;
exports.deleteFive = deleteFive;