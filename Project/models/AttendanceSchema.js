const mongoose = require('mongoose');

const attendanceSchema = new mongoose.Schema({
    date: { type: Date, default: Date.now },
    employee: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee' },
    status: { type: String, enum: ['present', 'absent', 'late'] }
  });
  
  const Attendance = mongoose.model('Attendance', attendanceSchema);

  module.exports = Attendance;