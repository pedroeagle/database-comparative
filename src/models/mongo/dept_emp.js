const { mongoose } = require('../../database');

const buildSchema = collection => new mongoose.Schema({
  emp_no: {
    type: String,
    required: true,
    index: collection === 'dept_emp_indexed' ? {
      unique: false,
      type: 1
    } : false
  },
  dept_no: {
    type: String,
    required: true,
    index: collection === 'dept_emp_indexed' ? {
      unique: false,
      type: 1
    } : false
  },
  from_date: {
    type: Date,
    required: true,
  },
  to_date: {
    type: Date,
    required: true,
  },
}, { collection: 'dept_emp' })

const DepartmentEmployeeSchema = buildSchema('dept_emp')
const DepartmentEmployeeIndexedSchema = buildSchema('dept_emp_indexed')
DepartmentEmployeeIndexedSchema.index({ dept_no: 1, emp_no: 1 }, { unique: true })

module.exports = {
  DepartmentEmployee: mongoose.models.dept_emp ||
    mongoose.model('dept_emp', DepartmentEmployeeSchema, 'dept_emp'),
  DepartmentEmployeeIndexed: mongoose.models.dept_emp_indexed ||
    mongoose.model('dept_emp_indexed', DepartmentEmployeeIndexedSchema, 'dept_emp_indexed')
};
