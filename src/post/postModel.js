const mongoose = require('mongoose');
const schema = mongoose.Schema;

const PostSchema = new schema({
  bodyText: {
    type: String,
    required: true,
    maxlenght: 500
  },
  discipline: {
    type: String,
    required: true
  }
})

module.exports = mongoose.model('Post', PostSchema);