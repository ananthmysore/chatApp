//chai is the testing library that we'll be using
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app');
const should = chai.should();

chai.use(chaiHttp);

describe('App API', () => {
  it('returns a message with status 200', (done) => {
    chai.request(server)
      .get('/api/room')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.an('object');
        done();
      });
  });
});
