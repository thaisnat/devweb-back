const express = require('express');
const router = express.Router();
const authenticController = require('./authenticController');

router.get('/', authenticController.status);

router.post('/', authenticController.login);

router.delete('/', authenticController.logout);

module.exports = router;
