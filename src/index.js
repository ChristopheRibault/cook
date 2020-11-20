require('dotenv').config()

import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import _Promise from 'bluebird';
import * as _controllers from './controllers';
import * as _validators from './validators';
import * as _middlwares from './middlewares';

/**
 * GLOBALS INITIALIZATION
 */
global.rootpath = __dirname;
global.Promise = _Promise;
global.controllers = _controllers;
global.validators = _validators;
global.middlwares = _middlwares;

const { createRouter } = require('./routes');

const app = express();
const server = app.listen(process.env.PORT || 3000, () => {
  console.info(`Listening to port ${process.env.PORT || 3000}`);
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
if (process.env.NODE_ENV === 'development') app.use(morgan('dev'));

app.post('*', middlwares.Request.generateUuid);

createRouter(app);

module.exports = server;
