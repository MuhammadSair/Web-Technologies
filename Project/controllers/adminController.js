const Admin = require("../models/Admin");
const Employee = require("../models/Employee");
const Hr = require("../models/Hr");
const LeaveRequest = require("../models/LeaveRequest");
const bcrypt = require("bcrypt");
const isValidObjectId = require("../middlewares/validation");
const Attendance = require("../models/AttendanceSchema");
const moment = require("moment");

const getLogin = (req, res) => {
  res.render("admin/login", { title: "Admin Login" });
};

const postLogin = async (req, res) => {
  try {
    const { username, password } = req.body;
    const admin = await Admin.findOne({ username });

    if (!admin) {
      return res.redirect("/admin/login");
    }

    const passwordMatch = await bcrypt.compare(password, admin.password);

    if (!passwordMatch) {
      return res.redirect("/admin/login");
    }

    req.session.adminId = admin._id;
    req.session.save();

    res.redirect("/admin/dashboard");
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).send("Internal server error");
  }
};

const getDashboard = async (req, res) => {
  try {
    const { search } = req.query;
    const page = parseInt(req.query.page) || 1;
    const limit = 7; // number of employees per page
    let query = {};

    if (search) {
      query = {
        $or: [
          { name: new RegExp(search, "i") },
          { email: new RegExp(search, "i") },
          { role: new RegExp(search, "i") },
          { username: new RegExp(search, "i") }, // added username to search
        ],
      };
    }

    const employees = await Employee.find(query)
      .skip((page - 1) * limit)
      .limit(limit);

    const count = await Employee.countDocuments(query);
    const pages = Math.ceil(count / limit);

    // Save search terms in session
    if (search) {
      req.session.searchHistory = req.session.searchHistory || [];
      req.session.searchHistory.push(search);
      req.session.searchHistory = req.session.searchHistory.slice(-5); // keep last 5 searches
    }

    res.render("admin/list-employees", {
      employees,
      role: "admin",
      search,
      page,
      pages,
      searchHistory: req.session.searchHistory || [], // Initialize to empty array if not defined
    });
  } catch (error) {
    console.error("Error fetching employees:", error);
    res.status(500).send("Internal server error");
  }
};

const getAddEmployee = (req, res) => {
  res.render("admin/add-employee", {
    query: req.query,
    employees: [],
    role: "admin",
  });
};

const postAddEmployee = async (req, res) => {
  const { name, email, role, salary, department, manager } = req.body;
  const default_Password = "11223344";
  try {
    const existingEmployee = await Employee.findOne({ email: email });
    if (existingEmployee) {
      return res.render("admin/add-employee", {
        query: { error: "emailExists" },
        employees: [],
        role: "admin",
      });
    }

    const newEmployee = new Employee({
      name,
      email,
      role,
      salary,
      department,
      manager,
      password: default_Password,
    });
    await newEmployee.save();
    return res.redirect("/admin/list-employees?success=employeeAdded");
  } catch (error) {
    console.error("Failed to add new employee:", error);
    return res.render("admin/add-employee", {
      query: { error: "internalError" },
      employees: [],
      role: "admin",
    });
  }
};

const getEditEmployee = async (req, res) => {
  const { id } = req.params;
  const trimmedId = id.trim();

  if (!isValidObjectId(trimmedId)) {
    console.error("Invalid ID format");
    return res.status(400).send("Invalid ID format");
  }

  try {
    const employee = await Employee.findById(trimmedId);
    const employees = await Employee.find({});

    if (!employee) {
      return res.status(404).send("Employee not found");
    } else {
      res.render("admin/edit-employee", {
        employee: employee,
        employees: employees,
        role: "admin",
      });
    }
  } catch (error) {
    console.error("Error fetching employee:", error);
    res.status(500).send("Internal server error");
  }
};

const getViewEmployee = async (req, res) => {
  const { id } = req.params;
  const trimmedId = id.trim();

  if (!isValidObjectId(trimmedId)) {
    console.error("Invalid ID format");
    return res.status(400).send("Invalid ID format");
  }

  try {
    const employee = await Employee.findById(trimmedId);

    if (!employee) {
      return res.status(404).send("Employee not found");
    } else {
      const attendance = await Attendance.find({ employee: trimmedId });
      const totalDays = attendance.length;
      const presentDays = attendance.filter(
        (a) => a.status === "present"
      ).length;
      const percentage = (presentDays / totalDays) * 100;

      res.render("admin/view-employee", {
        employee: employee,
        attendance: { totalDays, presentDays, percentage },
        role: "admin",
      });
    }
  } catch (error) {
    console.error("Error fetching employee:", error);
    res.status(500).send("Internal server error");
  }
};

const getDashboardData = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = 3;
    const offset = (page - 1) * limit;

    const totalEmployees = await Employee.countDocuments();
    const totalHrs = await Hr.countDocuments();
    const averageSalary = await Employee.aggregate([
      { $group: { _id: null, avgSalary: { $avg: "$salary" } } },
    ]).then((result) => (result.length ? result[0].avgSalary : 0));
    const leaveRequests = await LeaveRequest.find({}).limit(2);
    const recentHires = await Employee.find({
      hiredDate: {
        $gte: new Date(new Date().setDate(new Date().getDate() - 7)),
      },
    })
      .sort({ hiredDate: -1 })
      .limit(2);

    const threeDaysAgo = new Date(new Date().setDate(new Date().getDate() - 3));
    const attendance = await Attendance.find({ date: { $gte: threeDaysAgo } })
      .populate("employee", "name")
      .skip(offset)
      .limit(limit);
    const attendanceReport = attendance.map((attendance) => ({
      employee: attendance.employee.name,
      date: attendance.date.toLocaleDateString(),
      status: attendance.status,
    }));

    const totalAttendance = await Attendance.countDocuments({
      date: { $gte: threeDaysAgo },
    });
    const pagination = {
      currentPage: page,
      totalPages: Math.ceil(totalAttendance / limit),
    };

    res.render("admin/dashboard", {
      totalEmployees,
      totalHrs,
      averageSalary,
      leaveRequests,
      recentHires,
      role: "admin",
      attendanceReport,
      pagination,
    });
  } catch (error) {
    console.error("Error fetching data for dashboard:", error);
    res.status(500).send("Internal server error");
  }
};

const postEditEmployee = async (req, res) => {
  const { id } = req.params;
  const { name, email, role, salary, department, manager } = req.body;

  try {
    const employee = await Employee.findByIdAndUpdate(id, {
      name,
      email,
      role,
      salary,
      department,
      manager,
    });
    res.redirect("/admin/list-employees?success=employeeUpdated");
  } catch (error) {
    console.error("Error updating employee:", error);
    res.status(500).send("Internal server error");
  }
};

const getDeleteEmployee = async (req, res) => {
  const { id } = req.params;
  try {
    const employee = await Employee.findById(id);
    if (!employee) {
      return res.status(404).send("Employee not found.");
    }
    res.render("admin/delete-employee", { employee: employee, role: "admin" });
  } catch (error) {
    console.error("Error fetching employee:", error);
    res.status(500).send("Internal server error");
  }
};

const postDeleteEmployee = async (req, res) => {
  const { id } = req.params;
  try {
    await Employee.findByIdAndDelete(id);
    res.redirect("/admin/list-employees");
  } catch (error) {
    console.error("Error deleting employee:", error);
    res.status(500).send("Internal server error");
  }
};

const logout = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error("Error destroying session:", err);
      res.status(500).send("Internal server error");
    } else {
      res.clearCookie("connect.sid").redirect("/");
    }
  });
};

const getAddHr = (req, res) => {
  res.render("admin/add-hr", { role: "admin" });
};

const postAddHr = async (req, res) => {
  const default_Password = "11223344";
  const { name, email, department } = req.body;
  const newHr = new Hr({ name, email, department, password: default_Password });
  await newHr.save();
  res.redirect("/admin/list-hrs");
};

const getListHrs = async (req, res) => {
  const hrs = await Hr.find({});
  res.render("admin/list-hrs", { hrs, role: "admin" });
};

const getViewHr = async (req, res) => {
  const { id } = req.params;
  const hr = await Hr.findById(id);
  res.render("admin/view-hr", { hr, role: "admin" });
};

const getEditHr = async (req, res) => {
  const { id } = req.params;
  try {
    const hr = await Hr.findById(id);
    if (!hr) {
      return res.status(404).send("HR not found");
    }
    res.render("admin/edit-hr", { hr: hr, role: "admin" });
  } catch (error) {
    console.error("Error fetching HR:", error);
    res.status(500).send("Internal server error");
  }
};

const postEditHr = async (req, res) => {
  const { id } = req.params;
  const { name, email, department } = req.body;
  try {
    await Hr.findByIdAndUpdate(id, { name, email, department });
    res.redirect("/admin/list-hrs?success=hrUpdated");
  } catch (error) {
    console.error("Error updating HR:", error);
    res.status(500).send("Internal server error");
  }
};

const getDeleteHr = async (req, res) => {
  const { id } = req.params;
  try {
    const hr = await Hr.findById(id);
    if (!hr) {
      return res.status(404).send("HR not found.");
    }
    res.render("admin/delete-hr", { hr: hr, role: "admin" });
  } catch (error) {
    console.error("Error fetching HR:", error);
    res.status(500).send("Internal server error");
  }
};

const postDeleteHr = async (req, res) => {
  const { id } = req.params;
  try {
    await Hr.findByIdAndDelete(id);
    res.redirect("/admin/list-hrs");
  } catch (error) {
    console.error("Error deleting HR:", error);
    res.status(500).send("Internal server error");
  }
};

const getLeaveRequests = async (req, res) => {
  const leaveRequests = await LeaveRequest.find({});
  res.render("admin/leave-requests", { leaveRequests, role: "admin" });
};

const approveLeaveRequest = async (req, res) => {
  const id = req.body._id;
  const leaveRequest = await LeaveRequest.findById(id).exec();
  if (!leaveRequest) {
    return res.status(404).send("Leave request not found");
  }
  leaveRequest.status = "Approved";
  await leaveRequest.save();
  res.redirect("/admin/leave-requests");
};

const rejectLeaveRequest = async (req, res) => {
  const id = req.body._id;
  const leaveRequest = await LeaveRequest.findById(id).exec();
  if (!leaveRequest) {
    return res.status(404).send("Leave request not found");
  }
  leaveRequest.status = "Rejected";
  await leaveRequest.save();
  res.redirect("/admin/leave-requests");
};

const getAttendance = async (req, res) => {
  const employees = await Employee.find().select("_id name");
  res.render("admin/attendance", { employees, role: "admin" });
};

const postAttendance = async (req, res) => {
  const attendanceData = req.body.attendance;
  const date = moment(req.body.date, "DD-MM-YY").toDate();
  const attendanceRecords = [];

  for (const employeeId in attendanceData) {
    const attendanceStatus = attendanceData[employeeId];
    const attendanceRecord = new Attendance({
      employee: employeeId,
      status: attendanceStatus,
      date: date,
    });
    attendanceRecords.push(attendanceRecord);
  }

  try {
    await Attendance.insertMany(attendanceRecords);
    res.redirect("/hr/attendance");
  } catch (err) {
    console.error(err);
    res.status(500).send("Error saving attendance");
  }
};

module.exports = {
  getLogin,
  postLogin,
  getDashboard,
  getAddEmployee,
  postAddEmployee,
  getEditEmployee,
  postEditEmployee,
  getDeleteEmployee,
  postDeleteEmployee,
  logout,
  getAddHr,
  postAddHr,
  getListHrs,
  getViewHr,
  getEditHr,
  postEditHr,
  getDeleteHr,
  postDeleteHr,
  getLeaveRequests,
  getAttendance,
  getDashboardData,
  getViewEmployee,
  postAttendance,
  approveLeaveRequest,
  rejectLeaveRequest,
};
