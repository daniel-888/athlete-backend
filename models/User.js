const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
  {
    password: {
      type: String,
      required: true,
      select: false
    },
    lastLogin: {
      type: Date,
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    firstName: {
      type: String,
      // required: true,
    },
    lastName: {
      type: String,
      // required: true,
    },
    isActive: {
      type: Boolean,
      default: true
    },
  },
  {
    timestamps: true
  });

module.exports = User = mongoose.model('user', UserSchema);
