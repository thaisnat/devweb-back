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
  id: {
    type: Number,
    required: true,
    unique: true
  },
  discipline: {
    type: String,
    required: true
  }
})

module.exports = mongoose.model('question', qs_schema);