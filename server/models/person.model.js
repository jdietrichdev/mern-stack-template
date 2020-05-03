const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Person = new Schema({
  name: String,
  age: Number,
});

module.exports = mongoose.model('Person', Person);
