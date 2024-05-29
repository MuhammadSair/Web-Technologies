const mongoose = require('mongoose');

const leaveRequestSchema = new mongoose.Schema({
  employeeName: { type: String, required: true },
  leaveType: { type: String, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  reason: { type: String, required: true }
});

const LeaveRequest = mongoose.model('LeaveRequest', leaveRequestSchema);
module.exports = LeaveRequest;