const question = require('./questionModel');

exports.createQuestion = (req, res) => {
  const questionNew = new question(req.body);
  questionNew.save((err, question) => {
    if (err)
      next(err);
    res.status(201).json(question);
  });
};

exports.getQuestion = function (req, res, next) {
  question.findById(req.params.questionId, (err, question) => {
    if (err)
      next(err);
    res.status(200).json(question);
  });
};

exports.deleteQuestion = function (req, res, next) {
  question.findByIdAndRemove(req.params.questionId, (err, question) => {
    if (err)
      next(err);
    res.status(200).json({ mensagem: "Deleted successfully." });
  });
};
