require('@babel/register');

const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const app = require('../src');
const expect = chai.expect;

chai.request(app)
  .get('/recipes')
  .then(res => console.log(res.body))
