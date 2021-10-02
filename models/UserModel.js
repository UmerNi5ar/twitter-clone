const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const CryptoJS = require('crypto-js');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Enter your name'],
  },
  email: {
    type: String,
    required: [true, 'Please provide your email'],
    unique: true,
    lowerCase: true,
    validate: [validator.isEmail, 'The email address is not valid'],
  },
  userName: {
    type: String,
    unique: true,
    required: [true, 'Enter your username'],
  },
  photo: {
    type: String,
    default: 'default.jpg',
  },
  password: {
    type: String,
    minlength: 8,
    required: [true, 'Choose a password'],
    select: false,
  },
  passwordConfirm: {
    type: String,
    validate: {
      validator: function (el) {
        return el === this.password;
      },
      message: 'Passwords do not match',
    },
  },
  passwordChangedAt: Date,
  accessToken: { type: String, select: false },
});

userSchema.methods.cryptoEncrypt = async (token) => {
  const str = await CryptoJS.AES.encrypt(
    token,
    process.env.CRYPTOJS_SECRET
  ).toString();

  return str;
};
userSchema.pre('save', async function (next) {
  this.password = await bcrypt.hash(this.password, 12);
  this.passwordConfirm = undefined;
  next();
});
userSchema.pre('save', async function (next) {
  if (this.isModified('password' || this.isNew)) return next();
  this.passwordChangedAt = Date.now() - 1000;
  next();
});

userSchema.methods.changedPasswordAfter = function (JWTTimestamp) {
  if (this.passwordChangedAt) {
    const changedTimestamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
    );

    return JWTTimestamp < changedTimestamp;
  }

  // False means NOT changed
  return false;
};
userSchema.methods.checkPassword = async function (toCheckPass, toCheckWith) {
  const check = await bcrypt.compare(toCheckPass, toCheckWith);
  console.log(check);
  return check;
};
const User = mongoose.model('User', userSchema);

module.exports = User;
