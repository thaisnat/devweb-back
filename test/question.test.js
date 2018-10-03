const app = require('../server');
const request = require('supertest');
const chai = require('chai');
const expect = chai.expect;

describe('Test GET question', () => {
    it('Return all', () => {
        request(app)
            .get('/question')
            .end((err, res) => {
                expect('Content-Type', /json/);
                expect(res.statusCode).to.be.equal(200);
            });
    });
});

describe('Test POST question', () => {
    it('Returns a correctly created question', () => {
        const question = { title: 'Seminario TOP', bodyText: 'Se o mundo existe, Graças a Deus, porque ele existe?' };
        request(app)
            .post('/question')
            .send(question)
            .end((err, res) => {
                expect('Content-Type', /json/);
                expect(res.statusCode).to.be.equal(201);
                expect(res.body.title).to.be.equal('Seminario TOP');
                expect(res.body.bodyText).to.be.equal('Se o mundo existe, Graças a Deus, porque ele existe?');
            });
    });
});