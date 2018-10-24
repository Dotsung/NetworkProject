// 출처 : https://www.zerocho.com/category/NodeJS/post/57b7101ecfbef617003bf457

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  id: String,
  password: String
});

userSchema.methods.comparePassword = function(inputPassword, cb) {
  if (inputPassword === this.password) {
    cb(null, true);
  } else {
    cb('error');
  }
};

module.exports = mongoose.model('users', userSchema, 'users');