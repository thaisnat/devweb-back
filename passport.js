const LocalStrategy = require('passport-local').Strategy;
const passport = require('passport');
const user = require("./api/user/userRoute");

module.exports = function (passport) {

    //  function findUser(username, callback) {
    //    User.findOne({ "username": username }, function (err, doc) {
    //      callback(err, doc);
    //});
    //}

    //function findUserById(id, callback) {
    // const ObjectId = require("mongoose").ObjectId;
    //User.findById(id, (err, doc) => {
    //  callback(err, doc);
    //});
    // }

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
}