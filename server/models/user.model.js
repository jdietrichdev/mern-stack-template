const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;

const saltRounds = 8;

const User = new Schema({
  username: {
    type: String,
    unique: true
  },
  password: String,
  email: {
    type: String,
    unique: true
  },
  admin: {
    type: Boolean,
    default: false
  }
});

User.pre('save', function(next) {
  if(this.isNew) {
    const document = this;
    bcrypt.hash(document.password, saltRounds,
    function(err, hashedPassword) {
      if(err) {
        next(err);
      } else {
        document.password = hashedPassword;
        next();
      }
    });
  } else {
    next();
  }
});

User.methods.isCorrectPassword = function(password, callback) {
  bcrypt.compare(password, this.password, function(err, same) {
    if(err) {
      callback(err);
    } else {
      callback(err, same);
    }
  });
}

module.exports = mongoose.model('User', User);
