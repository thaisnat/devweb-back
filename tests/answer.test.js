const app = require('../services/config/server');
const request = require('supertest');
const chai = require('chai');
const server = request.agent('http://localhost:8000');
const userId = new mongoose.Types.ObjectId;
const answerId = new mongoose.Types.ObjectId;
const assert = require("assert");

const testAnswer = async () => {
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

    describe('Test GET answer', () => {
        it('Return all', (done) => {
            server
                .get('/api/answer/' + answerId.toString())
                .expect(200)
                .then(response => {
                    assert(response.body.bodyText, 'O mundo existe, graças a Deus, porque nós existimonos');
                    done()
                })
        });
    });

    describe('Test POST answer', () => {
        it('Returns a correctly created answer', () => {
            const answer = { "bodyText": 'O mundo existe, graças a Deus, porque nós existimonos' };
            it('respond with 201 created', (done) => {
                server
                    .post('/api/answer')
                    .send(answer)
                    .set('Accept', 'application/json')
                    .expect('Content-Type', /json/)
                    .expect(201, done);
            });
        });
    });

    describe('DELETE Answer', () => {
        it('Answer Deleted', (done) => {
            server
                .delete('/api/answer/' + answerId.toString())
                .expect(200)
                .end((err) => {
                    if (err) return done(err);
                    done();
                });
        });
    });

    describe('Delete User', () => {
        it('user deleted', (done) => {
            server
                .delete('/api/user/' + userId.toString())
                .expect(200)
                .end((err) => {
                    if (err) return done(err);
                    done();
                });
        });
    });
};

testAnswer();