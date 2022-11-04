const {mongoose} = require('../../database');

const SalariesSchema = new mongoose.Schema({
  emp_no: {
    type: Number,
    required: true,
  },
  salary: {
    type: Number,
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
}, {collection: 'salaries', autoCreate: true});

module.exports = {
  Salaries: mongoose.models.salaries ||
    mongoose.model('salaries', SalariesSchema, 'salaries'),
};
