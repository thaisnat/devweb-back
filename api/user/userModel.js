const mongoose = require('mongoose');
const schema = mongoose.Schema;


const userSchema = new schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  enrollment: {
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
});

userSchema.methods.verifyPassword = (password) => {
  return (userSchema.password === password);
};

module.exports = mongoose.model('user', userSchema);