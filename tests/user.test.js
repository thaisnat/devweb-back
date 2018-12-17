const app = require('../services/config/server');
const request = require('supertest');
const server = request.agent('http://localhost:8000');
const chai = require('chai');
const expect = chai.expect;
const mongoose = require('mongoose');
const userId = new mongoose.Types.ObjectId;
const assert = require("assert");

const testUser = async () => {
  runTester();
}

const runTester = () => {
  describe('create user', () => {
    const user = {
      "_id": userId.toHexString(),
      "username": 'sojesus',
      "password": 'loacehpeso',
      "email": 'anitta.paradinha@gmail.com'
    };
    it('respond with 201 created', (done) => {
      request(app)
        .post('/api/user')
        .send(user)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(201, done);
    });
  });

  describe('Test GET users', () => {
    it('Return all', function (done) {
      server
        .get('/api/user')
        .expect(200)
        .then(response => {
          assert(response.body[0].username, 'sojesus');
          assert(response.body[0].email, 'anitta.paradinha@gmail.com');

          done()
        })
    });
  });
}

describe('Test POST user', () => {
  it('Returns a user created correctly', () => {
    const user = { username: 'sojesus', password: 'loacehpeso', email: 'anitta.paradinha@gmail.com' };
    request(app)
      .post('/user')
      .send(user)
      .end((err, res) => {
        expect('Content-Type', /json/);
        expect(res.statusCode).to.be.equal(201);
        expect(res.body.username).to.be.equal('sojesus');
        expect(res.body.email).to.be.equal('anitta.paradinha@gmail.com');
      })
  })
})

describe('Update User', () => {
  const user = {
    "username": "agoravai",
    "email": "anita.poderosa@gmail.com",
  };
  it('respond with 200 edited', (done) => {
    server
      .put('/api/user/' + userId.toString())
      .send(user)
      .expect(200, done);
  });
  it('get user update', (done) => {
    server
      .get('/api/user/' + userId.toString())
      .expect(200)
      .then(response => {
        assert(response.body.username, 'agoravai');
        assert(response.body.email, "anita.poderosa@gmail.com");

        done()
      })
  });
});

describe('Delete User', () => {
  it('Check if user was deleted', (done) => {
    server
      .delete('/api/user/' + userId.toString())
      .expect(200)
      .end((err) => {
        if (err) return done(err);
        done();
      });
  });
});

testUser();