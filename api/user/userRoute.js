
module.exports = function (userRoute) {
  const user = require('./userController');

  userRoute.route('/user').post(user.createUser);
  userRoute.route('/user/:userId').get(user.getUser);
  userRoute.route('/user/:userId').put(user.updateUser);
  userRoute.route('/user/:userId').delete(user.deleteUser);

};





