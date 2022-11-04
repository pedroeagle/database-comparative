const {mongoose, connection} = require('../../database');

const EmployeesSchema = new mongoose.Schema({
  emp_no: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  birth_date: {
    type: Date,
    required: true,
  },
  hire_date: {
    type: Date,
    required: true,
  },
  first_name: {
    type: String,
    required: true,
  },
  last_name: {
    type: String,
    required: true,
  },
  salaries: [{
    salary: Number,
    from_date: Date,
    to_date: Date,
  }],
  titles: [{
    title: String,
    from_date: Date,
    to_date: Date,
  }],
}, {collection: 'employees'});

module.exports = {Employees: mongoose.models.employees || mongoose.model('employees', EmployeesSchema, 'employees')};
