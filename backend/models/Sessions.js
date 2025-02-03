const mongoose = require('mongoose');

const sessionsSchema = mongoose.Schema({
  mentorshipId: { type: mongoose.Schema.Types.ObjectId, ref: 'Mentorship', required: true },
  date: { type: Date, required: true },
  startTime: { type: String, required: true }, // Format : "HH:mm"
  endTime: { type: String, required: true },
  notes: { type: String, required: false },
  evaluation: {
    rating: { type: Number, min: 1, max: 5, required: false },
    feedback: { type: String, required: false }
  }
});

module.exports = mongoose.model('Session', sessionsSchema);
