const mongoose = require('mongoose');
const schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');

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
  discipline: {
    type: [{
      type: Schema.Types.ObjectId,
      ref: 'Discipline'
    }]
  },
  lists: {
    type: [
      {
        type: Schema.Types.ObjectId,
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