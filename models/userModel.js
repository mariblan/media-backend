const { Schema, model } = require('mongoose');

const userSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    match: /^[A-Za-z]+$/,
    minlength: 2,
    maxlength: 20,
  },
  email: {
    type: String,
    required: [true, 'E-mail is required'],
    unique: true,
    match: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    select: false,
  },
  active: { type: Boolean, required: true, default: true },
});

module.exports = model('User', userSchema);
