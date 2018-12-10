const mongoose = require('mongoose');
const schema = mongoose.Schema;

const questionSchema = new schema({
  bodyText: {
    type: String,
    required: true
  },
  discipline: {
    type: String,
    required: true
  }
})

module.exports = mongoose.model('question', questionSchema);