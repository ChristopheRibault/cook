const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../src');
chai.use(chaiHttp);
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
