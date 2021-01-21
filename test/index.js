const { requester, expect } = require('./config');

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
  const recipe = {
    "title": "Recette Test 01",
    "instructions": [
      "1. Lorem Ipsum",
      "2. Dolor sit amet"
    ],
    "ingredients": [
      {
        "name": "reused",
        "complement": "comp",
        "quantity": 2
      },
      {
        "name": "other",
        "quantity": 3
      },
    ]
  };

  it('Should create a recipe', (done) => {
    requester
      .post('/recipes')
      .set('content-type', 'application/json')
      .send(recipe)
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(201);
        expect(res.body[0]).to.be.an('object');
        done();
      });
  });

  it('Should return one recipe', (done) => {
    requester
    .get('/recipes')
    .end((err, res) => {
      expect(err).to.be.null;
      expect(res).to.have.status(200);
      expect(res.body).to.be.an('array').and.have.length(1);
      expect(res.body[0]).to.haveOwnProperty('uuid');
      done();
    })
  });

  it('Should delete a recipe', (done) => {
    requester
      .delete('/recipes')
      .query({name: {eq: 'Recette Test 01'}})
      .then((res) => {
        expect(res).to.have.status(204);
        return requester
          .get('/recipes')
          .then((res) => {
            expect(res.body).to.be.an('array').and.have.length(0);
            done();
          });
      });
  });

});


