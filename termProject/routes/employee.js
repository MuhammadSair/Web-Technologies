const express = require('express');
const router = express.Router();
const Employee = require('../models/Employee');

router.get('/login', (req, res) => {
  res.render('employee/login');
});

router.get('/profile', (req, res) => {
  res.render('employee/profile');
});

module.exports = router;