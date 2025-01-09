const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const fiveSchema = new Schema({
  to: {type: String, required: true},
  toId: {type: String, required: true},
  words: {type: Array, required: true},
  message: {type: String},
  from: {type: String, required: true},
  sender: {type: mongoose.Types.ObjectId, required: true, ref: 'User'},
})

module.exports = mongoose.model('Five', fiveSchema);