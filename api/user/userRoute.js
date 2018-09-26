const express = require('express');
var us_route = express.Router();
const userController = require('./userController');

us_route.use(function timeLog(req, res, next) {
  console.log('Time: ', Date.now())
  next()
})

us_route.post('/', userController.us_create);

us_route.get('/', userController.us_find);

us_route.get('/enrollment', userController.us_findByEnrollment);

us_route.get('/:id', userController.us_findById);

us_route.get('/login', userController.login);

us_route.get('/:id/profile', userController.profile);

us_route.get('/user/:id/question', userController.qs_findById);

module.exports = us_route;