const mongoose = require('mongoose');
const uniqueValidator = require("mongoose-unique-validator");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {type:String, required: true, unique: true},
  password: {type:String, required:true, minLength: 8},
  name: {type: String},
  year: {type: String},
  dev: {type: Boolean},
  des: {type: Boolean},
  pm: {type: Boolean},
  core: {type: Boolean},
  mentor: {type: Boolean},
  major: {type: String},
  minor: {type: String},
  birthday: {type: String},
  home: {type: String},
  quote: {type: String},
  favoriteThing1: {type: String},
  favoriteThing2: {type: String},
  favoriteThing3: {type: String},
  favoriteDartmouthTradition: {type: String},
  funFact: {type: String},
  picture: {type: String}, 
  fives: [{type: mongoose.Types.ObjectId, required: true, ref: 'Five'}]
})

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model("User", userSchema);