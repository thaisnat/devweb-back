const jwt = require('jsonwebtoken');
const User = require('../user/userModel');
const config = require('../../services/secret');

exports.login = (req, res, next) => {
  User.findOne({
    username: req.body.username
  }).then((user) => {
    if (!user) {
      return res.json({ success: false, message: 'Authentication failed. User not found. ' });
    } else if (user) {
      if (req.body.username === user.username && user.comparePassword(req.body.password, user.password)) {
        const payload = {
          username: user.username,
        };
        const token = jwt.sign(payload, config.secret);
        return res.json({ success: true, token: token, message: 'Enjoy your token' });
      } else {
        return res.json({ success: false, message: 'Authentication failed. Wrong password' });
      }
    }
  })
    .catch((err) => {
      return res.json({ success: false, message: 'Something went wrong. Try again', error: err.message });
    })
}

exports.authenticate = (req, res, next) => {
  var token = req.body.token || req.query.token || req.headers['x-access-token'];
  if (token) {
    try {
      const data = jwt.verify(token, config.secret);
      if (data) {
        req.username = data.username;
        next();
      } else {
        return res.json({ 'message': 'Failed to decode. Wrong token.' });
      }
    } catch (error) {
      return res.status(401).json({ 'message': 'Something went wrong, try again.', 'error': error.message });
    }
  } else {
    return res.status(401).json({ 'message': 'Failed to authenticate. Unreachable token.' });
  }
}

exports.authorizeByUser = (req, res, next) => {
  const username = req.username;
  if (username) {
    const reqUser = req.params.username;
    if (username === reqUser) {
      next();
    } else {
      res.status(401).send();
    }
  } else {
    res.status(400).send();
  }
}