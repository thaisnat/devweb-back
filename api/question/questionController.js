const question = require('./question');

exports.qs_create = (req, res) => {
  var question = new question(req.body);
  res.json({ temp: "Question register" })
}

exports.qs_find = (req, res) => {
  question.find({})
};

exports.qs_findById = (req, res) => {
  question.findById(req.params.id)
};

module.exports = qs_route;