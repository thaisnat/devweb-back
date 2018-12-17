const express = require('express');
const router = express.Router();
const RequestStatus = require('../../services/requests/requestStatus');
const answer = require('./answerController');


function Authentication(req, res, next) {
  console.log(req.session);
  if (req.isAuthenticated()) {
    next();
  } else {
    res.status(RequestStatus.UNAUTHORIZED).send('User not logged.');
  }
}

router.get('/', Authentication, answer.index);
router.get('/:answer_id', Authentication, answer.show);
router.post('/', Authentication, answer.createAnswer);
router.put('/:answer_id', Authentication, answer.update);
router.delete('/:answer_id', Authentication, answer.deleteAnswer);

module.exports = router;