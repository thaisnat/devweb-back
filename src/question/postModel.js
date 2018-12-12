const mongoose = require('mongoose');
const schema = mongoose.Schema;

const postSchema = new schema({
  bodyText: {
    type: String,
    required: true
  },
  discipline: {
    type: String,
    required: true
  }
})

module.exports = mongoose.model('post', postSchema);