const app = require('../server');
const request = require('supertest');
const chai = require('chai');
const expect = chai.expect;

describe('Test GET post', () => {
    it('Return all', () => {
        request(app)
            .get('/post')
            .end((err, res) => {
                expect('Content-Type', /json/);
                expect(res.statusCode).to.be.equal(200);
            });
    });
});

describe('Test POST post', () => {
    it('Returns a correctly created post', () => {
        const post = { discipline: 'Filosofia', bodyText: 'Se o mundo existe, Graças a Deus, porque ele existe?' };
        request(app)
            .post('/post')
            .send(post)
            .end((err, res) => {
                expect('Content-Type', /json/);
                expect(res.statusCode).to.be.equal(201);
                expect(res.body.discipline).to.be.equal('Filosofia');
                expect(res.body.bodyText).to.be.equal('Se o mundo existe, Graças a Deus, porque ele existe?');
            });
    });
});