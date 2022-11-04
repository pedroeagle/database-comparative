const {mongoose} = require('../../database');

const TitlesSchema = new mongoose.Schema({
  emp_no: {
    type: Number,
    required: true,
  },
  title: {
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
}, {collection: 'titles', autoCreate: true});

module.exports = {
  Titles: mongoose.models.titles ||
    mongoose.model('titles', TitlesSchema, 'titles'),
};
