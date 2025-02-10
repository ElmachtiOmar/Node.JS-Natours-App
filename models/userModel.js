const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const validator = require('validator');

const userShcema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A user must have a name!'],
  },
  email: {
    type: String,
    required: [true, 'A user must have an email!'],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'Please provide us with a valid email'],
  },
  photo: {
    type: String,
  },
  password: {
    type: String,
    required: [true, 'A user must have a password!'],
    minlength: [8, 'A password must have 8 or more characters'],
    select: false,
  },
  passwordConfirm: {
    type: String,
    require: [true, 'Please confirm you password'],
    validate: {
      validator: function (el) {
        return el === this.password;
      },
      message: 'Password should match password confirm',
    },
  },
  passwordChangedAt: Date,
});

userShcema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  this.passwordConfirm = undefined;
  next();
});

userShcema.methods.currectPassword = async function (
  candidatePassword,
  userPassword,
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

userShcema.methods.changedPasswordAfter = function (JWTTimestamp) {
  if (this.passwordChangedAt) {
    const changedTimestamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10,
    );
    console.log(changedTimestamp, JWTTimestamp);
    return JWTTimestamp < changedTimestamp;
  }

  return false;
};

const User = mongoose.model('User', userShcema);

module.exports = User;
