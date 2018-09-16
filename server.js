const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const sr = express();
const user = require("./router/user/user");

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

module.exports = sr;