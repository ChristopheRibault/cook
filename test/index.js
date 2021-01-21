const { requester, expect } = require('./config');

it('Is healthy', (done) => {
  requester
    .get('/')
    .end((err, res) => {
      expect(err).to.be.null;
      expect(res).to.have.status(200);
      done();
    });
});

