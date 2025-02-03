const mongoose = require('mongoose');

const messagesSchema = mongoose.Schema({
  mentorshipId: { type: mongoose.Schema.Types.ObjectId, ref: 'Mentorship', required: true }, // Référence au mentorat concerné
  senderId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // ID de l'expéditeur (mentor ou étudiant)
  content: { type: String, required: true }, // Contenu du message
  attachments: { type: [String], required: false }, // URLs ou noms des fichiers joints
  timestamp: { type: Date, default: Date.now } // Horodatage du message
});

module.exports = mongoose.model('Message', messagesSchema);
