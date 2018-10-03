const express = require("express"),
  bodyParser = require("body-parser"),
  morgan = require("morgan"),
  fs = require('fs'),
  path = require('path'),
  cache = require('memory-cache'),
  mongoose = require('mongoose'),
  passport = require('passport'),
  session = require('express-session'),
  MongoStore = require('connect-mongo')(session),
  sr = express(),
  port = process.env.PORT || 3000,
  user = require("./api/user/userRoute"),
  question = require("./api/question/questionRoute");

user(sr);
//question(sr);

const accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' })

// setup the logger
sr.use(morgan('tiny', { stream: accessLogStream }))

// Body-Parser
sr.use(bodyParser.urlencoded({ extended: false }));
sr.use(bodyParser.json());

sr.use(function (req, res, next) {
  res.header("Content-Type", "application/json");
  next();
});

sr.use('/public', express.static(__dirname + './static'));

//cache

cache.put('user', 'Ana');
cache.get('user');

mongoose.Promise = Promise;
mongoose.connect('mongodb://localhost/test', { useNewUrlParser: true });

//session

require('./passport')(passport);
sr.use(session({
  store: new MongoStore({
    mongooseConnection: mongoose.connection,
    ttl: 30 * 60
  }),
  secret: 'tempsecret',
  resave: false,
  saveUninitialized: false
}));

sr.use(passport.initialize());
sr.use(passport.session());

sr.get('/', (req, res) =>
  res.send("Bem vindo ao Site !!")
);

sr.listen(port, () => console.log("O sistema de monitoria online está sendo executado na porta " + port + "!"))

module.exports = sr;