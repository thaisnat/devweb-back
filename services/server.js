const express = require("express"),
  bodyParser = require("body-parser"),
  morgan = require("morgan"),
  fs = require('fs'),
  path = require('path'),
  sr = express(),
  cache = require('memory-cache'),
  mongoose = require('mongoose'),
  cors = require('cors'),
  swagger = require('./doc/docRoute'),
  authentic = require('../src/authentication/authenticRoute'),
  port = process.env.PORT || 3000;


const accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' })

// setup the logger
sr.use(morgan('tiny', { stream: accessLogStream }))

sr.use('/static', express.static(__dirname + '/static'))

// Body-Parser
sr.use(bodyParser.urlencoded({ extended: false }));
sr.use(bodyParser.json());

sr.use(function (req, res, next) {
  res.header("Content-Type", "application/json");
  next();
});

sr.use(cors());

const post = require('../src/post/postRoute'),
  answer = require('../src/answer/answerRoute'),
  user = require('../src/user/userRoute');

post(sr);
answer(sr);
user(sr);
swagger(sr);
authentic(sr);

sr.use('/public', express.static(__dirname + './static'));

//cache

cache.put('user', 'Ana');
cache.get('user');

mongoose.Promise = Promise;
mongoose.connect('mongodb://localhost/test', { useNewUrlParser: true });

sr.listen(port, () => console.log("O sistema de monitoria online está sendo executado na porta " + port + "!"))

module.exports = sr;
