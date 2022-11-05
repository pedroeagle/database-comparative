const {mongoose} = require('../../database');

const DepartmentEmployeeSchema = new mongoose.Schema({
  emp_no: {
    type: String,
    required: true,
  },
  dept_no: {
    type: String,
    required: true,
  },
  from_date: {
    type: Date,
    required: true,
  },
  to_date: {
    type: Date,
    required: true,
  },
}, {collection: 'dept_emp', autoCreate: true});

module.exports = {
  DepartmentEmployee: mongoose.models.dept_emp ||
    mongoose.model('dept_emp', DepartmentEmployeeSchema, 'dept_emp'),
};
