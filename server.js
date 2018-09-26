const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const sr = express();
const user = require("./router/user/user");
const user = require("./router/question/question");
const cache = require('memory-cache');
const cors = require('cors');
const passport = require('passport');
const session = require('express-session');

sr.get('/', (req, res) =>
  res.send("Welcome to website")
);

// Body-Parser
sr.use(bodyParser.urlencoded({ extended: false }));

sr.use(bodyParser.json());

sr.use(function (req, res, next) {
  res.header("Content-Type", "application/json");
  next();
});

sr.use('/public', express.static('./static'));
sr.use("./user", user);

sr.get('/api', (req, res) =>
  res.json({ msg: "will be successful!!!" })
);

const port = process.env.PORT || 3000;

sr.listen(port, () => console.log(`Server running on port ${port}`));

//cache

cache.put('user', 'Ana');
cache.get('user');

sr.use(cors());

//conf cors
sr.get('/login', cors(), function(req,res,next){
  res.json({msg: "user login"});
})

sr.get('/user/:id/question', cors(), function(req,res,next){
 res.json({msg: "user question by id"});
})

//session

require ('./back/passport') (passport);

sr.use (session ({

  //store: novo MongoStore ({
  //  mongooseConnection: mongoose.connection,
  //  ttl: 30 * 60 // = 30 minutos de sessão
  //}),
  //segredo: 'tempsecret',
 // resave: false,
 // saveUninitialized: false
})

);

sr.use(passport.initialize());
sr.use(passport.session());

module.exports = sr;