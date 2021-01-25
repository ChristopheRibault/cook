const { requester, expect } = require('./config');
const { recipes } = require('./data');
const knexfile = require('../knexfile').test;
const knex = require('knex')(knexfile);
const cleaner = require('knex-cleaner');

after(() => {
  requester.close();
  process.exit(0);
});

describe('HealthCheck', () => {
  it('Is healthy', (done) => {
    requester
      .get('/')
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        done();
      });
  });
});

describe('Recipes', () => {
  it('Should create recipes', (done) => {
    requester
      .post('/recipes')
      .set('content-type', 'application/json')
      .send(recipes)
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(201);
        expect(res.body).to.be.an('array').and.have.length(2);
        done();
      });
  });

  it('Should have created ingredients without duplicates', (done) => {
    requester
      .get('/ingredients')
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('array').and.have.length(3);
        done();
      });
  });

  it('Should return two recipes', (done) => {
    requester
    .get('/recipes')
    .end((err, res) => {
      expect(err).to.be.null;
      expect(res).to.have.status(200);
      expect(res.body).to.be.an('array').and.have.length(2);
      expect(res.body[0]).to.haveOwnProperty('uuid');
      done();
    })
  });

  it('Should delete a recipe', (done) => {
    requester
      .delete('/recipes')
      .query({filter: {title: {eq: 'Recette Test 01'}}})
      .then((res) => {
        expect(res).to.have.status(204);
        requester
          .get('/recipes')
          .then((res) => {
            expect(res.body).to.be.an('array').and.have.length(1);
            done();
          });
      });
  });

});
