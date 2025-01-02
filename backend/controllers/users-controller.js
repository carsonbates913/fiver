const uuid = require('uuid');
const HttpError = require('../models/error');
const { validationResult } = require('express-validator');

const DUMMY_USERS = [
  {
    "name": "Andy Kotz",
    "year": "2024",
    "dev": true,
    "des": false,
    "pm": false,
    "core": true,
    "mentor": true,
    "major": "Computer Science",
    "minor": "Engineering",
    "birthday": "06-02",
    "home": "Lyme, NH",
    "quote": "\"Every day above ground is a great day, remember that\" -Pitbull",
    "favorite thing 1": "Dirt",
    "favorite thing 2": "Foco bagels",
    "favorite thing 3": "The color green",
    "favorite dartmouth tradition": "Winter Carnival",
    "fun fact": "Stratus clouds sit between 20,000 and 40,000 ft above sea level",
    "picture": "https://api.typeform.com/responses/files/0514142805285dff562c5ae6cc6b5426b285d107387ed0bc92e68ae26bd7d316/T02FQFVUX_U01FBU7HX2S_f22834b3db7e_512.png"
  },
  {
    "name": "Jaden Halevi",
    "year": "2026",
    "dev": true,
    "des": false,
    "pm": false,
    "core": false,
    "mentor": false,
    "major": "Computer Science",
    "minor": "Digital Art",
    "birthday": "07-01",
    "home": "Mount Vernon, NY",
    "quote": "There has to be one cheesecake flavor I like, just ONE",
    "favorite thing 1": "My iPad",
    "favorite thing 2": "Jordan 1 Midnight Navys",
    "favorite thing 3": "SPOTIFYYYYY",
    "favorite dartmouth tradition": "Homecoming",
    "fun fact": "red pandas raise their hands when they feel threatened :( but it looks so cute",
    "picture": "https://api.typeform.com/responses/files/ceafde83d7f1e47a7694a56cd78e97047f36dd04bf2ba4ef6718c377ae081116/IMG_0126.jpg"
  },
  {
    "name": "Jorie MacDonald",
    "year": "2025",
    "dev": true,
    "des": false,
    "pm": true,
    "core": true,
    "mentor": false,
    "major": "Computer Science",
    "minor": "Human Centered Design",
    "birthday": "06-22",
    "home": "San Diego, CA",
    "quote": "\u201cHow can I possibly be expected to handle school on a day like this?\u201d - Ferris Bueller",
    "favorite thing 1": "FOCO tender queso (ask me about it)",
    "favorite thing 2": "FOCO milkshake (ask me about it)",
    "favorite thing 3": "Back of the Napkin Hot Dogs",
    "favorite dartmouth tradition": "The Bonfire",
    "fun fact": "I don't eat fruit!",
    "picture": "https://api.typeform.com/responses/files/304c46d218a537ac6bb2012527c089044bd1d6fb0179b86b7960c56f54c54a63/Screenshot_2023_04_16_at_8.46.13_PM.png"
  },]

const getUsers = (req, res, next) => {
  res.json(DUMMY_USERS);
}

const createUser = (req, res, next) => {
  const errors = validationResult(req)
  if(!errors.isEmpty()){
    throw new HttpError("Invalid inputs", 422);
  }

  const {email, password, name, year, dev, des, pm, core, mentor, major, minor, birthday, home, quote, "favorite thing 1" : favoriteThing1, "favorite thing 2" : favoriteThing2, "favorite thing 3" : favoriteThing3, "favorite dartmouth tradition" : favoriteDartmouthTradition, "fun fact" : funFact, picture} = req.body;

  const userExists = DUMMY_USERS.find((user) => user.email === email);

  if(userExists){
    throw new HttpError("Could not create user, account with provided email already exists", 422);
  }

  const newUser = {
    id: uuid.v4(),
    email,
    password,
    name,
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
    picture
  }

  DUMMY_USERS.push(newUser);

  res.status(201).json(newUser);
}

const login = (req, res, next) => {
  const { email, password } = req.body;

  const loginUser = DUMMY_USERS.find((user) => user.email === email);

  if(!loginUser || loginUser.password !== password){
    throw new HttpError("Could not identify a user with provided credentials", 401);
  }

  res.status(200).json({message: "successfully signed user in!"});
}


exports.getUsers = getUsers;
exports.createUser = createUser;
exports.login = login;