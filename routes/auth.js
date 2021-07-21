'use strict';
const express = require('express');
const authController = require('../controllers/auth');
const router = express.Router();
//router.post('/account', authController.account);

router.post('/login1', authController.login1);
router.post('/register1', authController.register1);

module.exports = router;
