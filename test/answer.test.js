const app = require('../server');
const request = require('supertest');
const chai = require('chai');
const expect = chai.expect;

describe('Test GET answer', () => {
    it('Return all', () => {
        request(app)
            .get('/answer')
            .end((err, res) => {
                expect('Content-Type', /json/);
                expect(res.statusCode).to.be.equal(200);
            });
    });
});

describe('Test POST answer', () => {
    it('Returns a correctly created answer', () => {
        const answer = { bodyText: 'O mundo existe, graças a Deus, porque nós existimonos' };
        request(app)
            .post('/answer')
            .send(answer)
            .end((err, res) => {
                expect('Content-Type', /json/);
                expect(res.statusCode).to.be.equal(201);
                expect(res.body.bodyText).to.be.equal('O mundo existe, graças a Deus, porque nós existimonos');
            });
    });
});