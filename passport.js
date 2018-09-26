const LocalStrategy = require('passport-local').Strategy;
const user = require("./router/user/user");

module.exports = function (passport){
    user.use(passport.initialize());
    user.use(passport.session());

    user.get('/', (req, res) => { console.log('Inside the homepage callback')
         console.log(req.sessionID)
        res.send(`You got home page!\n`)
    });

    user.use(new LocalStrategy(
    function(email, password, done) {
        user.findOne({ email: email }, function (err, email) {
        if (err) { return done(err); }
        if (!email) { return done(null, false); }
        if (!user.verifyPassword(password)) { return done(null, false); }
        return done(null, user);
        });
    }
    ));

    user.post('/login', (req, res, next) => {
    console.log('Inside POST /login callback');
    passport.authenticate('local',
    {succesuseredirect: '/', failureRedirect: 'login'});
    req.login(user, (err)=> {
    console.log('Inside req.login() callback');
    return res.send('You were authenticated & logged in!\n');
    })
    (req, res, next);
    });

    user.get('/login', (req, res) => {
    if(req.isAuthenticated()) {
        res.send('you hit the authentication endpoint\n')
    } else {
        res.redirect('/')
    }
    })
}