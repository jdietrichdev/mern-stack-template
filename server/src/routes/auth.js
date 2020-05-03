const express = require('express');
const jwt = require('jsonwebtoken');

const router = express.Router();
const withAuth = require('../middleware');
const secret = 'supersecretsecret';
let User = require('../../models/user.model');

router.post('/createUser', (req, res) => {
  console.log('Creating user...');
  User.findOne({ 'username': req.body.username }, (err, foundUser) => {
    if (err) {
      console.log(err);
    } else {
      if (foundUser === null) {
        console.log('New User');
        let newUser = new User(req.body);
        newUser.save()
          .then(newUser => {
            const { password, __v, ...user } = newUser.toObject();
            const payload = { user };
            const token = jwt.sign(payload, secret, {
              expiresIn: '30m'
            });
            console.log('Creating cookie');
            res.cookie('user_token', token, { path: '/' }).status(200).json(user);
          })
          .catch(err => {
            res.status(400).send('Failed to add user');
          });
      } else {
        res.status(200).send('User already exists with that username');
      }
    }
  });
});

router.post('/authenticate', (req, res) => {
  User.findOne({ 'username': req.body.username }, (err, foundUser) => {
    if(err) {
      res.status(400).send('Error retrieving data');
    } else if(foundUser === null) {
      res.status(200).send('User not found or incorrect password');
    } else {
      foundUser.isCorrectPassword(req.body.password, (err, same) => {
        if(err || !same) {
          res.status(200).send('User not found or incorrect password');
        } else {
          const { password, __v, ...user } = foundUser.toObject();
          const payload = { user };
          const token = jwt.sign(payload, secret, {
            expiresIn: '30m'
          });
          res.cookie('user_token', token, { path: '/' }).status(200).json(user);
        }
      });
    }
  });
});

router.get('/logout', (req, res) => {
  console.log('Clearing cookie');
  res.clearCookie('user_token', { path: '/' });
});

router.get('/checkToken', withAuth, (req, res) => {
  const user = req.user;
  res.status(200).json(user);
});

module.exports = router;