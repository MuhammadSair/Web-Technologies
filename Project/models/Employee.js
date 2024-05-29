const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const employeeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  role: { type: String, required: true },
  salary: { type: Number, required: true },
  hiredDate: { type: Date, default: Date.now },
  department: { type: String },
  password: { type: String, required: true },
  attendance: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Attendance' }]
});

employeeSchema.pre('save', async function(next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});


const Employee = mongoose.model('Employee', employeeSchema);

module.exports = Employee;
