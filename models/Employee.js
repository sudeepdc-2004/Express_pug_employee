const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
  e_id: { type: String, required: true, unique: true },
  e_name: { type: String, required: true },
  e_email: { type: String, required: true },
  e_number: { type: String, required: true },
  e_gender: { type: String, required: true },
  e_dep: { type: String, required: true },
  e_location: { type: String, required: true }
});

module.exports = mongoose.model('Employee', employeeSchema);
