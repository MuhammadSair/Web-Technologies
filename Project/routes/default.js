const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.render('index');
});

router.get('/admin/login', (req, res) => {
  res.render('admin/login', {title: "Admin"});
});

router.get('/hr/login', (req, res) => {
  res.render('admin/login', {title: "HR"});
});

router.get('/employee/login', (req, res) => {
  res.render('employee/login');
});

// router.get('*', (req, res) => {
//   res.status(404).render('404');
// });

module.exports = router;