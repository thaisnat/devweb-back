const express = require('express');
const router = express.Router();
const RequestStatus = require('../../services/requests/requestStatus');
const post = require('./postController');


function Authentication(req, res, next) {
  console.log(req.session);
  if (req.isAuthenticated()) {
    next();
  } else {
    res.status(RequestStatus.UNAUTHORIZED).send('User not logged.');
  }
}

router.get('/', Authentication, post.index);

router.get('/:post_id', Authentication, post.show);

router.post('/', Authentication, post.createPost);

router.put('/:post_id', Authentication, post.update);

router.delete('/:post_id', Authentication, post.deletePost);

module.exports = router;