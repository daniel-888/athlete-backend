const mongoose = require('mongoose');

const SportSchema = new mongoose.Schema(
  {
      // Basic Information
      label: { type: String, required: true },
  },
  {
      timestamps: true
  }
);

module.exports = Sport = mongoose.model('sports', SportSchema);
