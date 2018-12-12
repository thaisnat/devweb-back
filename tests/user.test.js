const app = require('../server');
const request = require('supertest');
const chai = require('chai');
const expect = chai.expect;

describe('Test GET users', () => {
  it('Return all', () => {
    request(app)
      .get('/user')
      .end((err, res) => {
        expect('Content-Type', /json/);
        expect(res.statusCode).to.be.equal(200);
      });
  });
});

describe('Test POST user', () => {
  it('Returns a user created correctly', () => {
    const user = { username: 'sojesus', password: 'loacehpeso', enrollment: '113164243' };
    request(app)
      .post('/user')
      .send(user)
      .end((err, res) => {
        expect('Content-Type', /json/);
        expect(res.statusCode).to.be.equal(201);
        expect(res.body.username).to.be.equal('sojesus');
        expect(res.body.enrollment).to.be.equal('113164243');
      })
  })
})