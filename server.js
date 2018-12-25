const express = require("express"),
    bodyParser = require("body-parser"),
    morgan = require("morgan"),
    fs = require('fs'),
    path = require('path'),
    sr = express(),
    cache = require('memory-cache'),
    mongoose = require('mongoose'),
    methodOverride = require('method-override'),
    cors = require('cors'),
    swaggerUi = require('swagger-ui-express'),
    passport = require('passport'),
    session = require('express-session'),
    MongoStore = require('connect-mongo')(session),
    ENV = process.env.ENVIROMENT || 'development',
    db = require('./services/config/mongodb');
port = process.env.PORT || 8000;

var db_url;
db_url = db.local_url;

// Cors
if (ENV === 'production') {
    sr.use(cors());
} else {
    sr.use(cors());
}

const accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' })

// setup the logger
sr.use(morgan('tiny', { stream: accessLogStream }))

sr.use('/static', express.static(__dirname + '/static'))

// Mongo
mongoose.connect(db_url, { useNewUrlParser: true });
mongoose.set('useCreateIndex', true);
mongoose.Promise = Promise;
mongoose.connect(db_url, { useNewUrlParser: true });

// Morgan
sr.use(morgan('dev'));

// Parse application/json
sr.use(bodyParser.json());

// Parse application/vnd.api+json as json
sr.use(bodyParser.json({ type: 'application/vnd.api+json' }));

// Parse application/x-www-form-urlencoded
sr.use(bodyParser.urlencoded({ extended: true }));

// override with the X-HTTP-Method-Override header in the request. simulate DELETE/PUT
sr.use(methodOverride('X-HTTP-Method-Override'));

sr.use(methodOverride('X-HTTP-Method-Override'));

sr.use(function (req, res, next) {
    res.header("Content-Type", "application/json");
    next();
});

// API Routes
const post = require('./src/post/postRoute'),
    answer = require('./src/answer/answerRoute'),
    auth = require('./services/authentication/authenticRoute'),
    user = require('./src/user/userRoute');

sr.use('/api/post', post);
sr.use('/api/answer', answer);
sr.use('/api/user', user);
sr.use('/api/auth', auth);

//Swagger
swaggerDocument = require('./services/config/doc/swagger')
sr.use('/api-doc', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Static Files
sr.use('/static', express.static(path.join(__dirname, 'public')));

//cache

cache.put('user', 'Ana');
cache.get('user');


// Session Secutiry
require('./services/config/passport')(passport);
sr.use(bodyParser.json({ limit: '50mb' }));
sr.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
sr.use(session({
    store: new MongoStore({
        mongooseConnection: mongoose.connection,
        ttl: 30 * 60 // = 60 minutos de sessão
    }),
    secret: process.env.SESSION_SECRET || 'pocpoc',
    secureProxy: true,
    resave: false,
    saveUninitialized: false,
}));
sr.use(passport.initialize());
sr.use(passport.session());
sr.get('/', (req, res) => res.send('Olaaaa!!'))
sr.listen(port, () => console.log("O sistema de monitoria online está sendo executado na porta " + port + "!"))

module.exports = sr;
