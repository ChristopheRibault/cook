import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import _Promise from 'bluebird';
import swaggerDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import * as _controllers from './controllers';
import * as _validators from './validators';
import * as _middlwares from './middlewares';
import apiDef from '../package.json';

require('dotenv').config();

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
const server = app.listen(process.env.API_PORT || 3000, () => {
  console.info(`Listening to port ${process.env.API_PORT || 3000}`);
});

app.use(middlwares.Request.makeFilters);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
if (process.env.NODE_ENV === 'development') app.use(morgan('dev'));

createRouter(app);

const swagger = swaggerDoc({
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: apiDef.name,
      version: apiDef.version,
    },
    host: process.env.API_HOST,
    basePath: '/',
  },
  apis: [
    './src/**/*.js',
    './src/**/*.yaml',
  ],
});

app.get('/swagger.json', (req, res) => res.send(swagger));
app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swagger));

module.exports = server;
