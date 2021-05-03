const { model, Schema } = require('mongoose');

const userSchema = new Schema({
  password: String,
  email: String,
  username: String,
  createdAt: String,
});

module.exports = model('User', userSchema);
