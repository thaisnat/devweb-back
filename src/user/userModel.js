const mongoose = require('mongoose');
const schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');

const validateEmail = function (email) {
  var val = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return val.test(email);
};

const userSchema = new schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
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
  image: {
    type: String
  },
  lists: {
    type: [
      {
        type: schema.Types.ObjectId,
        ref: 'List'
      }
    ]
  }
});

userSchema.pre('save', function (next) {
  const user = this;
  if (!user.isModified('password')) {
    return next();
  }
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(user.password, salt, null, (err, hash) => {
      user.password = hash;
      next();
    });
  });
});

userSchema.method({
  comparePassword(reqPassword, userPassword) {
    return bcrypt.compareSync(reqPassword, userPassword)
  }
});

module.exports = mongoose.model('user', userSchema);