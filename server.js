const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
let Person = require('./models/person.model');

const app = express();
const personRoutes = express.Router();
const PORT = 8000;

app.use(cors());
app.use(bodyParser.json());

app.use('/', express.static(path.join(__dirname, 'assets')));

mongoose.connect('mongodb://127.0.0.1:27017/exampledb', {useNewUrlParser: true});
mongoose.set('useCreateIndex', true);
const connection = mongoose.connection;

connection.once('open', () => {
  console.log('MongoDB database connection established successfully');
});

//Basic object and API to access
personRoutes.get('/get', (req, res) => {
  Person.find((err, persons) => {
    if(err) {
      console.log(err);
    } else {
      res.json(persons);
    }
  });
});

personRoutes.get('/get/:id', (req, res) => {
  Person.findById(req.params.id, (err, person) => {
    if(err) {
      console.log(err);
    } else {
      res.json(person);
    }
  })
})

personRoutes.post('/add', (req, res) => {
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

personRoutes.post('/update/:id', (req, res) {
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
})

app.use('/api/person', personRoutes);

app.use('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'assets', 'index.html'));
});

app.listen(PORT, () => {
  console.log('Server is listening on port: ' + PORT);
});
