const {mongoose} = require('../../database');

const DepartmentManagerSchema = new mongoose.Schema({
  dept_no: {
    type: String,
    required: true,
  },
  emp_no: {
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
}, {collection: 'dept_manager', autoCreate: true});

module.exports = {
  DepartmentManager: mongoose.models.dept_manager ||
    mongoose.model('dept_manager', DepartmentManagerSchema, 'dept_manager'),
};
