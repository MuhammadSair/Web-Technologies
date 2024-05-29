const express = require('express');
const router = express.Router();
const {isHrAuthenticated} = require('../middlewares/auth');
const hrController = require('../controllers/hrController');

router.get('/login', hrController.getLogin);
router.post('/login', hrController.postLogin);
router.get('/list-employees', isHrAuthenticated, hrController.getDashboard);
router.get('/add-employee', isHrAuthenticated, hrController.getAddEmployee);
router.post('/add-employee', hrController.postAddEmployee);
router.get('/edit-employee/:id', isHrAuthenticated, hrController.getEditEmployee);
router.post('/edit-employee/:id', hrController.postEditEmployee);
router.get('/delete-employee/:id', isHrAuthenticated, hrController.getDeleteEmployee);
router.post('/delete-employee/:id', hrController.postDeleteEmployee);
router.get('/logout', hrController.logout);
router.get('/leave-requests', isHrAuthenticated, hrController.getLeaveRequests);
router.get('/attendance', isHrAuthenticated, hrController.getAttendance);
router.post('/submit-attendance', isHrAuthenticated, hrController.postAttendance);
router.get('/view-employee/:id', isHrAuthenticated, hrController.getViewEmployee);

module.exports = router;