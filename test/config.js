const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);

const server = require('../src');
const { expect, request } = chai;

const requester = request(server).keepOpen();

module.exports = {
  chai,
  expect,
  request,
  chaiHttp,
  server,
  requester,
};
