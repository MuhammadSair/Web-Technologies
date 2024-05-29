const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");
const { isAdminAuthenticated } = require("../middlewares/auth");

router.get("/login", adminController.getLogin);
router.post("/login", adminController.postLogin);
router.get(
  "/list-employees",
  isAdminAuthenticated,
  adminController.getDashboard
);
router.get(
  "/add-employee",
  isAdminAuthenticated,
  adminController.getAddEmployee
);
router.post("/add-employee", adminController.postAddEmployee);
router.get(
  "/edit-employee/:id",
  isAdminAuthenticated,
  adminController.getEditEmployee
);
router.post("/edit-employee/:id", adminController.postEditEmployee);
router.get(
  "/delete-employee/:id",
  isAdminAuthenticated,
  adminController.getDeleteEmployee
);
router.post("/delete-employee/:id", adminController.postDeleteEmployee);
router.get("/logout", adminController.logout);
router.get("/add-hr", isAdminAuthenticated, adminController.getAddHr);
router.post("/add-hr", isAdminAuthenticated, adminController.postAddHr);
router.get("/list-hrs", isAdminAuthenticated, adminController.getListHrs);
router.get("/view-hr/:id", isAdminAuthenticated, adminController.getViewHr);
router.get("/edit-hr/:id", isAdminAuthenticated, adminController.getEditHr);
router.post("/edit-hr/:id", isAdminAuthenticated, adminController.postEditHr);
router.get("/delete-hr/:id", isAdminAuthenticated, adminController.getDeleteHr);
router.post(
  "/delete-hr/:id",
  isAdminAuthenticated,
  adminController.postDeleteHr
);
router.post(
  "/submit-attendance",
  isAdminAuthenticated,
  adminController.postAttendance
);
router.get(
  "/leave-requests",
  isAdminAuthenticated,
  adminController.getLeaveRequests
);
router.post(
  "/leave-requests/approve",
  isAdminAuthenticated,
  adminController.approveLeaveRequest
);
router.post(
  "/leave-requests/reject",
  isAdminAuthenticated,
  adminController.rejectLeaveRequest
);
router.get("/attendance", isAdminAuthenticated, adminController.getAttendance);
router.get(
  "/dashboard",
  isAdminAuthenticated,
  adminController.getDashboardData
);
router.get(
  "/view-employee/:id",
  isAdminAuthenticated,
  adminController.getViewEmployee
);

module.exports = router;
