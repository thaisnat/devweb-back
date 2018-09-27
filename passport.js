const LocalStrategy = require('passport-local').Strategy;
const passport = require('passport');
const user = require("./router/user/user");

module.exports = function (passport) {

    function findUser(username, callback) {
        User.findOne({ "username": username }, function (err, doc) {
            callback(err, doc);
        });
    }

    function findUserById(id, callback) {
        const ObjectId = require("mongoose").ObjectId;
        User.findById(id, (err, doc) => {
            callback(err, doc);
        });
    }

    passport.serializeUser(function (user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function (id, done) {
        User.findById(id, function (err, user) {
            done(err, user);
        });
    });

    passport.use(new LocalStrategy(

        function (email, password, done) {
            user.findOne({ username: username }, function (err, user) {
                if (err) { return done(err); }
                if (!user) { return done(null, false); }

                if (!user.verifyPassword(password)) {
                    return done(null, false, { message: 'Incorrect username. Please try again !' })
                };
                if (!user.validPassword(password)) {
                    return done(null, false, { message: 'Incorrect password. Please try again !' });
                }
                return done(null, user);
            });
        }));

    user.post('/login', (req, res, next) => {
        console.log('Inside POST /login callback');
        passport.authenticate('local',
            { succesuseredirect: '/', failureRedirect: 'login' });
        req.login(user, (err) => {
            console.log('Inside req.login() callback');
            return res.send('You were authenticated & logged in!\n');
        })
            (req, res, next);
    });

    user.get('/login', (req, res) => {
        if (req.isAuthenticated()) {
            res.send('you hit the authentication endpoint\n')
        } else {
            res.redirect('/')
        }
    })

    user.get('/', (req, res) => {
        console.log('Inside the homepage callback')
        console.log(req.sessionID)
        res.send(`You got home page!\n`)
    });
}