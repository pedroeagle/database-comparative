const {mongoose} = require('../../database');

const DepartmentsSchema = new mongoose.Schema({
  dept_no: {
    type: String,
    required: true,
  },
  dept_name: {
    type: String,
    required: true,
  },
}, {collection: 'departments', autoCreate: true});

module.exports = {
  Departments: mongoose.models.departments ||
    mongoose.model('departments', DepartmentsSchema, 'departments'),
};
