const mongoose = require('mongoose');
const schema = mongoose.Schema;

const answerSchema = new schema({
  bodyText: {
    type: String,
    required: true
  }
})

module.exports = mongoose.model('answer', answerSchema);