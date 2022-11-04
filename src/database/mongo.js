const mongoose = require('mongoose');

const options = {
  authSource: 'admin',
  user: 'mongo',
  pass: 'mongo',
  useNewUrlParser: true,
  useUnifiedTopology: true,
};
mongoose.connect('mongodb://mongo:27017/employees', options);

module.exports = {
  mongoose,
};
