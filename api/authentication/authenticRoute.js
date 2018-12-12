module.exports = (authenticRoute) => {
  const authenticCtrl = require('./authenticController');

  authenticRoute.route('/authentication')
    .post(authenticCtrl.login);
}