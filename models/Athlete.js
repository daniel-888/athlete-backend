const mongoose = require('mongoose');

const AthleteSchema = new mongoose.Schema(
  {
    // Basic Information
    avatar: { type: String, required: true },
    name: { type: String, required: true },
    dateOfBirth: { type: Date, required: true },
    location: { type: String, required: true },
    gender: { type: String, required: true },
    phone: { type: String },
    interests: { type: String },
    description: { type: String },

    // About Information
    sports: [{ type: String, required: true }],
    team: { type: String },

    creator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user'
    }
  },
  {
    timestamps: true
  }
);

module.exports = Athlete = mongoose.model('athletes', AthleteSchema);
