module.exports = function (answerRoute) {
    const answer = require('./answerController');
  
    answerRoute.route('/answer').post(answer.createanswer);
    answerRoute.route('/answer/:answerId').get(answer.getanswer);
    answerRoute.route('/answer/:answerId').delete(answer.deleteanswer);
  };