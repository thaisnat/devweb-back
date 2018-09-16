const request = require('supertest');
const express = require('express');

const test = express();

test.get('/user', function (req, res) {
  res.status(200).json({ name: 'Natasha' });
});

request(test)
  .get('/user')
  .expect('Content-Type', /json/)
  .expect('Content-Length', '15')
  .expect(200)
  .end(function (err, res) {
    if (err) throw err;
  });