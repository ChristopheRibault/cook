require('dotenv').config()

import express from 'express';

const { createRouter } = require('./routes');

const app = express();
const server = app.listen(process.env.PORT || 3000, () => {
  console.info(`Listening to port ${process.env.PORT || 3000}`);
});

createRouter(app);

module.exports = server;
