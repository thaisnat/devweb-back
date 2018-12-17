const express = require('express');
const router = express.Router();
const RequestStatus = require('../../services/requests/requestStatus');
const user = require('./userController');

function authentication(req, res, next) {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.status(RequestStatus.UNAUTHORIZED).send('User not logged.');
  }
}

router.get('/', authentication, user.index);

router.get('/user_id', authentication, user.show);

router.post('/', authentication, user.createUser);

router.put('/:user_id', authentication, user.updateUser);

router.delete('/:user_id', authentication, user.deleteUser);

module.exports = router;





