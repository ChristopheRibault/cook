const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../src');

const { expect } = chai;
chai.use(chaiHttp);

module.exports = {
  chai,
  expect,
  chaiHttp,
  server,
};
