const express = require('express');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const config = require('jconf');

const app = express();
const database = require('./models');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(expressValidator());

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  next();
});

app.use(require('./routes/index'));

database
  .then(() => console.log('database connected'))
  .then(() => new Promise((resolve, reject) => {
    app.listen(process.env.PORT || config.port, config.address, resolve);
    app.on('error', reject);
  }))
  .then(() => console.log(`server ${config.address}:${process.env.PORT || config.port} listening...`))
  .catch(err => console.error('Internal server error: ', err));
