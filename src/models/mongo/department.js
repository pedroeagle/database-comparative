const { mongoose } = require('../../database');

const buildSchema = collection => new mongoose.Schema({
  dept_no: {
    type: String,
    required: true,
    index: collection === 'departments_indexed' ? {
      unique: true,
      type: 1
    } : false
  },
  dept_name: {
    type: String,
    required: true,
  }
}, { collection });

const DepartmentsSchema = buildSchema('departments')
const DepartmentsIndexedSchema = buildSchema('departments_indexed')

module.exports = {
  Departments: mongoose.models.departments ||
    mongoose.model('departments', DepartmentsSchema, 'departments'),
  DepartmentsIndexed: mongoose.models.departments_indexed ||
    mongoose.model('departments_indexed', DepartmentsIndexedSchema, 'departments_indexed')
};
