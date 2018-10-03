
module.exports = function (questionRoute) {
  const question = require('./questionController');

  questionRoute.route('/question').post(question.createquestion);
  questionRoute.route('/question/:questionId').get(question.getquestion);
  questionRoute.route('/question/:questionId').delete(question.deletequestion);
};
