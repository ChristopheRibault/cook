require('dotenv').config()

import express from 'express';
import bodyParser from 'body-parser';
import _Promise from 'bluebird';
import * as _controllers from './controllers';
import * as _validators from './validators';

/**
 * GLOBALS INITIALIZATION
 */
global.rootpath = __dirname;
global.Promise = _Promise;
global.controllers = _controllers;
global.validators = _validators;

const { createRouter } = require('./routes');

const app = express();
const server = app.listen(process.env.PORT || 3000, () => {
  console.info(`Listening to port ${process.env.PORT || 3000}`);
});

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

createRouter(app);

module.exports = server;
