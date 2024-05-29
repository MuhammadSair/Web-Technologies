const Employee = require('../models/Employee');
const Hr = require('../models/Hr');
const bcrypt = require('bcrypt');
const isValidObjectId = require('../middlewares/validation');
const Attendance = require("../models/AttendanceSchema");
const LeaveRequest = require('../models/LeaveRequest');
const moment = require('moment');


const getLogin = (req, res) => {
    res.render('admin/login', {title: "HR Login"});
  };
  

const postLogin = async (req, res) => {
    try {
      const { username, password } = req.body;
      const hr = await Hr.findOne({ email: username });
  
      if (!hr) {
        return res.redirect('/hr/login');
      }
  
      const passwordMatch = await bcrypt.compare(password, hr.password);
  
      if (!passwordMatch) {
        return res.redirect('/hr/login', {title: "HR Login"});
      }
  
      req.session.hrId = hr._id;
      req.session.save();
  
      res.redirect('/hr/list-employees');
    } catch (error) {
      console.error('Error during login:', error);
      res.status(500).send('Internal server error');
    }
  };

const getDashboard = async (req, res) => {
    try {
      const employees = await Employee.find({});
      res.render('hr/list-employees', { employees , role: "hr"});
    } catch (error) {
      console.error('Error fetching employees:', error);
      res.status(500).send('Internal server error');
    }
};


const getAddEmployee = (req, res) => {
  res.render('hr/add-employee', { query: req.query, employees: [] , role: "hr" });
};

const postAddEmployee = async (req, res) => {
  const { name, email, role, salary, department, manager } = req.body;
  const default_Password = "11223344";
  try {
    const existingEmployee = await Employee.findOne({ email: email });
    if (existingEmployee) {
      return res.render('hr/add-employee', { query: { error: 'emailExists' }, employees: [] , role: "hr" });
    }
  
    const newEmployee = new Employee({ name, email, role, salary, department, manager, password: default_Password });
    await newEmployee.save();
    return res.redirect('/hr/list-employees?success=employeeAdded');
  } catch (error) {
    console.error('Failed to add new employee:', error);
    return res.render('hr/add-employee', { query: { error: 'internalError' }, employees: [] , role: "hr" });
  }
}

const getEditEmployee = async (req, res) => {
  const { id } = req.params;
  const trimmedId = id.trim();
  
  if (!isValidObjectId(trimmedId)) {
    console.error('Invalid ID format');
    return res.status(400).send('Invalid ID format');
  }
  
  try {
    const employee = await Employee.findById(trimmedId);
    const employees = await Employee.find({});
  
    if (!employee) {
      return res.status(404).send("Employee not found");
    } else {
      res.render('hr/edit-employee', { employee: employee, employees: employees , role: "hr"});
    }
  } catch (error) {
    console.error('Error fetching employee:', error);
    res.status(500).send('Internal server error');
  }
};

const postEditEmployee = async (req, res) => {
  const { id } = req.params;
  const { name, email, role, salary, department, manager } = req.body;
  
  try {
    const employee = await Employee.findByIdAndUpdate(id, { name, email, role, salary, department, manager });
    res.redirect('/hr/list-employees?success=employeeUpdated');
  } catch (error) {
    console.error('Error updating employee:', error);
    res.status(500).send('Internal server error');
  }
};

const getDeleteEmployee = async (req, res) => {
  const { id } = req.params;
  try {
    const employee = await Employee.findById(id);
    if (!employee) {
      return res.status(404).send("Employee not found.");
    }
    res.render('hr/delete-employee', { employee: employee , role: "hr"});
  } catch (error) {
    console.error('Error fetching employee:', error);
    res.status(500).send('Internal server error');
  }
};

const postDeleteEmployee = async (req, res) => {
  const { id } = req.params;
  try {
    await Employee.findByIdAndDelete(id);
    res.redirect('/hr/list-employees');
  } catch (error) {
    console.error('Error deleting employee:', error);
    res.status(500).send('Internal server error');
  }
};

const logout = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error('Error destroying session:', err);
      res.status(500).send('Internal server error');
    } else {
      res.clearCookie('connect.sid').redirect('/');
    }
  });
};

const getViewEmployee = async (req, res) => {
  const { id } = req.params;
  const trimmedId = id.trim();

  if (!isValidObjectId(trimmedId)) {
    console.error('Invalid ID format');
    return res.status(400).send('Invalid ID format');
  }

  try {
    const employee = await Employee.findById(trimmedId);

    if (!employee) {
      return res.status(404).send("Employee not found");
    } else {
      const attendance = await Attendance.find({ employee: trimmedId });
      const totalDays = attendance.length;
      const presentDays = attendance.filter((a) => a.status === 'present').length;
      const percentage = (presentDays / totalDays) * 100;

      res.render('hr/view-employee', { employee: employee, attendance: { totalDays, presentDays, percentage }, role: "hr" });
    }
  } catch (error) {
    console.error('Error fetching employee:', error);
    res.status(500).send('Internal server error');
  }
};

const getLeaveRequests = async (req, res) => {
  const leaveRequests = await LeaveRequest.find({});
  res.render('hr/leave-requests', { leaveRequests, role: "hr" });
};


const getAttendance = async (req, res) => {
  const employees = await Employee.find().select('_id name');
  res.render('hr/attendance', { employees, role: "hr" });
};

const postAttendance = async (req, res) => {
  const attendanceData = req.body.attendance;
  const date = moment(req.body.date, 'DD-MM-YY').toDate(); 
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
    res.redirect('/hr/attendance');
  } catch (err) {
    console.error(err);
    res.status(500).send('Error saving attendance');
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
    getViewEmployee,
    getLeaveRequests,
    getAttendance,
    postAttendance
  }