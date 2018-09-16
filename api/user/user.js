const mongoose = require('mongoose');
const schema = new mongoose.Schema;


var us_schema = new schema({
  name: {
    type: String
  },
  username: {
    type: String,
    required: true,
    unique: true
  },
  id: { //enroll
    type: Number,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  status: {
    type: String,
    required: true
  },
  mode: {
    type: String,
    required: true
  }
})

module.exports = mongoose.model('user', us_schema);