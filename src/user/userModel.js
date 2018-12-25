const mongoose = require('mongoose');
const schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');

const validateEmail = function (email) {
  var val = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return val.test(email);
};

const UserSchema = new schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: validateEmail,
      message: 'Invalid email'
    }
  },
  password: {
    type: String,
    required: true
  }
});

UserSchema.methods.generateHash = (password) => {
  return bcrypt.hash(password, bcrypt.genSaltSync(10), null);
};

UserSchema.methods.validPassword = (password, userPassword) => {
  return bcrypt.compareSync(password, userPassword);
};

var User = mongoose.model('User', UserSchema);

module.exports = User;