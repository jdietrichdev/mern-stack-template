const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const person = require('./server/src/routes/person');
const auth = require('./server/src/routes/auth');

const app = express();
const router = express.Router();
const PORT = 8000;

app.use(cors());
app.use(bodyParser.json());
app.use(cookieParser());

mongoose.connect('mongodb://127.0.0.1:27017/exampledb', {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.set('useCreateIndex', true);
const connection = mongoose.connection;

connection.once('open', () => {
  console.log('MongoDB database connection established successfully');
});

app.use('/', express.static(path.join(__dirname, 'assets')));
router.use('/auth', auth);
router.use('/person', person);

app.use('/api', router);

app.use('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'assets', 'index.html'));
});

app.listen(PORT, () => {
  console.log('Server is listening on port: ' + PORT);
});
