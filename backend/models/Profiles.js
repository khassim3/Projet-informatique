const mongoose = require('mongoose');

const profilesSchema = mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  bio: { type: String, required: false },
  skills: { type: [String], required: false }, // Tableau de compétences
  interests: { type: [String], required: false }, // Centres d'intérêt
  availability: { 
    type: Map, 
    of: [String], 
    required: false 
  }, // Exemple : { "monday": ["9:00-12:00"], "friday": ["14:00-16:00"] }
});

module.exports = mongoose.model('Profile', profilesSchema);
