const LocalStrategy = require('passport-local').Strategy;
const User = require('../../src/user/userModel');

module.exports = function (passport) {

    function findUser(username, callback) {
        User.findOne({ "username": username }).select('+password')
            .then((doc, err) => {
                callback(err, doc);
            });
    }

    function findUserById(id, callback) {
        const ObjectId = require("mongodb").ObjectId;
        User.findById(id, (err, doc) => {
            callback(err, doc);
        });
    }

    passport.serializeUser(function (user, done) {
        done(null, user._id);
    });

    passport.deserializeUser(function (id, done) {
        findUserById(id, function (err, user) {
            done(err, user);
        });
    });

    passport.use(new LocalStrategy({
        usernameField: 'username',
        passwordField: 'password'
    },
        (username, password, done) => {
            findUser(username, (err, user) => {
                if (err) {
                    return done(err);
                }
                if (!user) {
                    return done(null, false, 'User not found.');
                }
                if (!user.validPassword(password, user.password)) {
                    return done(null, false, 'Wrong password.');
                }
                return done(null, user);
            });
        }));
}