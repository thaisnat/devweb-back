const mongoose = require('mongoose');
const schema = new mongoose.Schema;

var qs_schema = new Schema({
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

module.exports = mongoose.model('question', qs_schema);