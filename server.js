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

mongoose.connect('mongodb://127.0.0.1:27017/exampledb', {useNewUrlParser: true});
mongoose.set('useCreateIndex', true);
const connection = mongoose.connection;

connection.once('open', () => {
  console.log('MongoDB database connection established successfully');
});

personRoutes.get('/get', (req, res) => {
  Person.find((err, persons) => {
    if(err) {
      console.log(err);
    } else {
      res.json(persons);
    }
  });
});

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

app.use('/api/person', personRoutes);

app.listen(PORT, () => {
  console.log('Server is listening on port: ' + PORT);
});
