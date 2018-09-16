const express = require('express');
const qs_route = express.Router();
const questionController = require('./questionController');

qs_route.use(function timeLog(req, res, next) {
  console.log('Time: ', Date.now())
  next()
})

qs_route.post('/', questionController.qs_create);

qs_route.get('/', questionController.qs_find);

qs_route.get('/:id', questionController.qs_findById);