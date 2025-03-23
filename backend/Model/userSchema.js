const mongoose = require('mongoose');
const db = require("../db/db");

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, minlength: 6 },
  firstName: { type: String, required: true },
  lastName: { type: String }

});

const User = mongoose.model('User', userSchema);

module.exports = {User};
