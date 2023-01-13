const {connection, mongoose} = require('../../database');

const buildSchema = (collection) => new mongoose.Schema({
  emp_no: {
    type: String,
    required: true,
    index: collection === 'employees_indexed' ? {
      unique: true,
      type: 1,
    } : false,
  },
  gender: {
    type: String,
    required: true,
    enum: ['M', 'F'],
  },
  birth_date: {
    type: Date,
    required: true,
  },
  hire_date: {
    type: Date,
    required: true,
    index: collection === 'employees_indexed' ? {
      unique: false,
      type: 1,
    } : false,
  },
  first_name: {
    type: String,
    required: true,
    faker: 'name.firstName',
  },
  last_name: {
    type: String,
    required: true,
    faker: 'name.lastName',
  },
  salaries: [{
    salary: Number,
    from_date: Date,
    to_date: Date,
  }],
  titles: [{
    title: {
      type: String,
      enum: ['Engineer', 'Senior Engineer', 'Manager', 'Assistant Engineer', 'Staff', 'Senior Staff', 'Technique Leader'],
    },
    from_date: Date,
    to_date: Date,
  }],
}, {collection});

const EmployeesSchema = buildSchema('employees');
const EmployeesIndexedSchema = buildSchema('employees_indexed');

module.exports = {
  Employees:
    mongoose.models.employees ||
    mongoose.model('employees', EmployeesSchema, 'employees'),
  EmployeesIndexed: mongoose.models.employees_indexed ||
    mongoose.model('employees_indexed', EmployeesIndexedSchema, 'employees_indexed'),
  EmployeesSchema,
  EmployeesIndexedSchema,
};
