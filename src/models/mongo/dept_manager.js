const {mongoose} = require('../../database');

const buildSchema = (collection) => new mongoose.Schema({
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
    index: collection === 'dept_manager_indexed' ? {
      unique: false,
      type: 1,
    } : false,
  },
  to_date: {
    type: Date,
    required: true,
  },
}, {collection});

const DepartmentManagerSchema = buildSchema('dept_manager');
const DepartmentManagerIndexedSchema = buildSchema('dept_manager_indexed');

module.exports = {
  DepartmentManager: mongoose.models.dept_manager ||
    mongoose.model('dept_manager', DepartmentManagerSchema, 'dept_manager'),
  DepartmentManagerIndexed: mongoose.models.dept_manager_indexed ||
    mongoose.model('dept_manager_indexed', DepartmentManagerIndexedSchema, 'dept_manager_indexed'),
};
