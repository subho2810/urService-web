'use strict';
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.render('homepage2');
});
router.get('/homepage', (req, res) => {
  res.render('homepage');
});

router.get('/services', (req, res) => {
  res.render('services');
});
router.get('/account', (req, res) => {
  res.render('account');
});
router.get('/persondetail', (req, res) => {
  res.render('persondetail');
});
router.get('/referafriend', (req, res) => {
  res.render('referafriend');
});
router.get('/register1', (req, res) => {
  res.render('register1');
});
router.get('/login1', (req, res) => {
  res.render('login1');
});
module.exports = router;
