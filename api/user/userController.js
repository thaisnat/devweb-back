const user = require('./user');

exports.us_create = (req, res) => {
  var user = new user(req.body);
  res.json({ temp: "User register" })
}

exports.us_find = (req, res) => {
  user.find({})
};

exports.us_findByEnrollment = (req,res) => {
  user.findByEnrollment(req.params.findByEnrollment)
}
exports.us_findById = (req, res) => {
  user.findById(req.params.id)
};

exports.login = (req, res) => {
  res.json({ temp: "User login" })
};

exports.profile = (req, res) => {
  user.profile({});
  res.json({ temp: "User profile" + req.params.id })
};

exports.qs_findById = (req, res) => {
  user.findQuestion(req.params.id)
  res.json({ temp: "List questions of user" + req.params.id })
};

module.exports = us_route;