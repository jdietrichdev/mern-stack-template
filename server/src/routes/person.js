const express = require('express');
const router = express.Router();

let Person = require('../../models/person.model');

//Basic object and API to access
router.get('/get', (req, res) => {
  Person.find((err, persons) => {
    if(err) {
      console.log(err);
    } else {
      res.json(persons);
    }
  });
});

router.get('/get/:id', (req, res) => {
  Person.findById(req.params.id, (err, person) => {
    if(err) {
      console.log(err);
    } else {
      res.json(person);
    }
  })
})

router.post('/add', (req, res) => {
  let newPerson = new Person(req.body);
  newPerson.save()
    .then(newPerson => {
      const {__v, ...person} = newPerson.toObject();
      res.status(200).json(person);
    })
    .catch(err => {
      res.status(400).send('Failed to add user');
    });
});

router.post('/update/:id', (req, res) => {
  Person.findById(req.params.id, (err, person) => {
    if(!person || err) {
      res.status(400).send('ID not found');
    } else {
      person.name = req.body.name;
      person.age = req.body.age;

      person.save().then(person => {
        res.json({'requestId': person.id});
      })
      .catch(err => {
        res.status(400).send('Error updating request');
      })
    }
  })
});

module.exports = router;