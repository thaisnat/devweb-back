const answer = require('./answerModel');

exports.createanswer = (req, res) => {
  const answerNew = new answer(req.body);
  answerNew.save((err, answer) => {
    if (err)
      next(err);
    res.status(201).json(answer);
  });
};

exports.getAnswer = function (req, res, next) {
  answer.findById(req.params.answerId, (err, answer) => {
    if (err)
      next(err);
    res.status(200).json(answer);
  });
};

exports.deleteAnswer = function (req, res, next) {
  answer.findByIdAndRemove(req.params.answerId, (err, answer) => {
    if (err)
      next(err);
    res.status(200).json({ mensagem: "Deleted successfully." });
  });
};
