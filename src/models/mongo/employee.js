const { mongoose, connection } = require('../../database');

const EmployeesSchema = new mongoose.Schema({
  emp_no: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
    enum: ['M', 'F']
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
    faker: 'name.firstName'
  },
  last_name: {
    type: String,
    required: true,
    faker: 'name.lastName'
  },
  salaries: [{
    salary: Number,
    from_date: Date,
    to_date: Date,
  }],
  titles: [{
    title: {
      type: String,
      enum: ['Engineer', 'Senior Engineer', 'Manager', 'Assistant Engineer', 'Staff', 'Senior Staff', 'Technique Leader']
    },
    from_date: Date,
    to_date: Date,
  }],
}, { collection: 'employees' });

module.exports = { Employees: mongoose.models.employees || mongoose.model('employees', EmployeesSchema, 'employees'), EmployeesSchema };
