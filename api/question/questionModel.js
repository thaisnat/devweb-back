const mongoose = require('mongoose');
const schema = mongoose.Schema;

const questionSchema = new schema({
  title: {
    type: String
  },
  bodyText: {
    type: String,
    required: true
  },
  discipline: {
    type: String,
    required: true
  },
  author: {
    type: String,
  }
})

module.exports = mongoose.model('question', questionSchema);