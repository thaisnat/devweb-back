
module.exports = function (userRoute) {
  const user = require('./userController');
  const authentication = require('../authentication/authenticController');
  const authentic = authentication.authenticate;
  const permittedUser = authentication.authorizeByUser;


  userRoute.route('/user')
    .post(user.createUser)
    .get(authentic, user.listUser);

  userRoute.route('/user/:username')
    .get(authentic, user.getUser)
    .put(authentic, permittedUser, user.updateUser)
    .delete(authentic, permittedUser, user.deleteUser);

};





