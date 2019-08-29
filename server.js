const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
const PORT = 8000;

app.use(cors());
app.use(bodyParser.json());

app.listen(PORT, () => {
  console.log('Server is listening on port: ' + PORT);
});
