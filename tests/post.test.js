const app = require('../services/config/server');
const request = require('supertest');
const server = request.agent('http://localhost:8000');
const userId = new mongoose.Types.ObjectId;
const postId = new mongoose.Types.ObjectId;
const assert = require("assert");

const testPost = async () => {
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

    describe('Test GET post', () => {
        it('Return all', (done) => {
            server
                .get('/api/post/' + postId.toString())
                .expect(200)
                .then(response => {
                    assert(response.body.bodyText, "Se o mundo existe, graças a Deus, por que ele existe?");
                    done()
                })
        });
    });

    describe('Test POST post', () => {
        it('Returns a correctly created post', () => {
            const post = { "discipline": 'Filosofia', "bodyText": 'Se o mundo existe, Graças a Deus, porque ele existe?' };
            it('respond with 201 created', (done) => {
                server
                    .post('/api/post')
                    .send(post)
                    .set('Accept', 'application/json')
                    .expect('Content-Type', /json/)
                    .expect(201, done);
            });
        });
    });

    describe('DELETE post', () => {
        it('Post Deleted', (done) => {
            server
                .delete('/api/post/' + postId.toString())
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

testPost();